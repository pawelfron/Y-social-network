from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from ..models import User, Follow
import tempfile
from PIL import Image
import io


class UserAPITests(APITestCase):
    """Test class for User API endpoints"""
    
    def setUp(self):
        # Create test users
        self.user1 = User.objects.create_user(
            username='testuser1', 
            email='test1@example.com', 
            password='pass12345',
            first_name='Test',
            last_name='User1',
            profile_description='Test user 1 description'
        )
        
        self.user2 = User.objects.create_user(
            username='testuser2', 
            email='test2@example.com', 
            password='pass12345',
            first_name='Test',
            last_name='User2',
            profile_description='Test user 2 description'
        )
        
        self.user3 = User.objects.create_user(
            username='testuser3', 
            email='test3@example.com', 
            password='pass12345'
        )
        
        # Create test follow relationships
        Follow.objects.create(follower=self.user1, followed=self.user2)
        Follow.objects.create(follower=self.user3, followed=self.user1)
        
        # Get an access token for authentication
        url = reverse('token_obtain_pair')
        resp = self.client.post(url, {'username': 'testuser1', 'password': 'pass12345'}, format='json')
        self.token = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
    
    def generate_photo(self):
        """Helper method to generate a test image file"""
        image = Image.new('RGB', (100, 100), color='red')
        temp_file = io.BytesIO()
        image.save(temp_file, format='JPEG')
        temp_file.seek(0)
        return SimpleUploadedFile("test_photo.jpg", temp_file.read(), content_type="image/jpeg")
    
    def test_get_user_profile(self):
        """Test retrieving a user's profile"""
        url = reverse('user_profile', kwargs={'user_id': self.user2.id})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'testuser2')
        self.assertEqual(response.data['first_name'], 'Test')
        self.assertEqual(response.data['last_name'], 'User2')
        self.assertEqual(response.data['profile_description'], 'Test user 2 description')
        self.assertTrue(response.data['is_following'])
    
    def test_update_own_profile(self):
        """Test updating own profile"""
        url = reverse('user_update', kwargs={'user_id': self.user1.id})
        data = {
            'username': 'updateduser1',
            'first_name': 'Updated',
            'last_name': 'Name',
            'profile_description': 'Updated description'
        }
        response = self.client.put(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user1.refresh_from_db()
        self.assertEqual(self.user1.username, 'updateduser1')
        self.assertEqual(self.user1.first_name, 'Updated')
        self.assertEqual(self.user1.last_name, 'Name')
        self.assertEqual(self.user1.profile_description, 'Updated description')
    
    def test_cannot_update_another_user_profile(self):
        """Test that a user cannot update another user's profile"""
        url = reverse('user_update', kwargs={'user_id': self.user2.id})
        data = {'username': 'hacked'}
        response = self.client.put(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.user2.refresh_from_db()
        self.assertEqual(self.user2.username, 'testuser2')
    
    def test_get_user_followers(self):
        """Test getting a list of user's followers"""
        url = reverse('user_followers', kwargs={'user_id': self.user1.id})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['user']['username'], 'testuser3')
    
    def test_get_user_following(self):
        """Test getting a list of users that a user is following"""
        url = reverse('user_following', kwargs={'user_id': self.user1.id})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['user']['username'], 'testuser2')
    
    def test_follow_user(self):
        """Test following a user"""
        url = reverse('follow_user', kwargs={'user_id': self.user3.id})
        response = self.client.post(url)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Follow.objects.filter(follower=self.user1, followed=self.user3).exists())
    
    def test_follow_already_following_user(self):
        """Test following a user that is already being followed"""
        url = reverse('follow_user', kwargs={'user_id': self.user2.id})
        response = self.client.post(url)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_cannot_follow_self(self):
        """Test that a user cannot follow themselves"""
        url = reverse('follow_user', kwargs={'user_id': self.user1.id})
        response = self.client.post(url)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(Follow.objects.filter(follower=self.user1, followed=self.user1).exists())
    
    def test_unfollow_user(self):
        """Test unfollowing a user"""
        url = reverse('unfollow_user', kwargs={'user_id': self.user2.id})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Follow.objects.filter(follower=self.user1, followed=self.user2).exists())
    
    def test_unfollow_not_following_user(self):
        """Test unfollowing a user that is not being followed"""
        url = reverse('unfollow_user', kwargs={'user_id': self.user3.id})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_get_users_list(self):
        """Test getting a list of all users"""
        url = reverse('user_list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
    
    def test_get_users_list_with_search(self):
        """Test getting a filtered list of users with search parameter"""
        url = reverse('user_list') + '?search=User2'
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['username'], 'testuser2')
        
    def test_update_profile_photo(self):
        """Test updating a user's profile photo"""
        url = reverse('user_update', kwargs={'user_id': self.user1.id})
        photo = self.generate_photo()
        data = {
            'profile_photo': photo,
            'username': self.user1.username,
        }
        response = self.client.put(url, data, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user1.refresh_from_db()
        self.assertTrue(self.user1.profile_photo) 