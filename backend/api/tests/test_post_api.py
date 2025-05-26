from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from ..models import User, Post, Follow
import io
from PIL import Image


class PostAPITests(APITestCase):

    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', email='u1@test.com', password='pass123')
        self.user2 = User.objects.create_user(username='user2', email='u2@test.com', password='pass123')

        Follow.objects.create(follower=self.user1, followed=self.user2)

        self.post1 = Post.objects.create(author=self.user1, content="Post by user1")
        self.post2 = Post.objects.create(author=self.user2, content="Post by user2")

        # Login
        url = reverse('token_obtain_pair')
        resp = self.client.post(url, {'username': 'user1', 'password': 'pass123'})
        self.token = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def generate_photo(self):
        image = Image.new('RGB', (100, 100), color='blue')
        file = io.BytesIO()
        image.save(file, 'JPEG')
        file.seek(0)
        return SimpleUploadedFile("test.jpg", file.read(), content_type='image/jpeg')

    def test_get_all_posts(self):
        url = reverse('post_list_create')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_get_only_followed_posts(self):
        url = reverse('post_list_create') + '?onlyFollowed=true'
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['author']['username'], 'user2')

    def test_create_post(self):
        url = reverse('post_list_create')
        data = {
            'content': 'New test post',
            'image': self.generate_photo()
        }
        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['content'], 'New test post')

    def test_get_post_details(self):
        url = reverse('post_detail_edit_delete', kwargs={'postId': self.post1.id})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], self.post1.content)

    def test_edit_own_post(self):
        url = reverse('post_detail_edit_delete', kwargs={'postId': self.post1.id})
        data = {'content': 'Updated content'}
        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], 'Updated content')

    def test_cannot_edit_others_post(self):
        url = reverse('post_detail_edit_delete', kwargs={'postId': self.post2.id})
        data = {'content': 'Hack attempt'}
        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_own_post(self):
        url = reverse('post_detail_edit_delete', kwargs={'postId': self.post1.id})
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Post.objects.filter(id=self.post1.id).exists())

    def test_cannot_delete_others_post(self):
        url = reverse('post_detail_edit_delete', kwargs={'postId': self.post2.id})
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(Post.objects.filter(id=self.post2.id).exists())

    def test_liking_own_post(self):
        url = reverse('post_likes', kwargs={'postId': self.post1.id})
        response = self.client.post(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.post1.likes.filter(id=self.user1.id).exists())

    def test_liking_others_post(self):
        url = reverse('post_likes', kwargs={'postId': self.post2.id})
        response = self.client.post(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.post2.likes.filter(id=self.user1.id).exists())

    def test_unliking_own_post(self):
        url = reverse('post_likes', kwargs={'postId': self.post1.id})
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(self.post1.likes.filter(id=self.user1.id).exists())

    def test_unliking_others_post(self):
        url = reverse('post_likes', kwargs={'postId': self.post2.id})
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(self.post2.likes.filter(id=self.user1.id).exists())

    def test_liking_already_liked_post(self):
        url = reverse('post_likes', kwargs={'postId': self.post1.id})
        response = self.client.post(url)
        
        response = self.client.post(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.post1.likes.filter(id=self.user1.id).exists())

    def test_unliking_already_unliked_post(self):
        url = reverse('post_likes', kwargs={'postId': self.post1.id})
        response = self.client.delete(url)
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(self.post1.likes.filter(id=self.user1.id).exists())

    def test_liking_non_existant_post(self):
        url = reverse('post_likes', kwargs={'postId': 123141})
        response = self.client.post(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_unliking_non_existant_post(self):
        url = reverse('post_likes', kwargs={'postId': 123141})
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)