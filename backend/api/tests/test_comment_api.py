from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ..models import User, Post, Comment

class CommentAPITests(APITestCase):
    """Test class for Comment API endpoints"""
    
    def setUp(self):
        # Create test user
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='password123'
        )
        
        # Create a test post
        self.post = Post.objects.create(
            content="Test post content",
            author=self.user
        )
        
        # Create test comments
        self.comment1 = Comment.objects.create(
            post=self.post,
            author=self.user,
            content="This is a test comment"
        )
       
        self.comment2 = Comment.objects.create(
            post=self.post,
            author=self.user,
            content="This is another test comment"
        )
        
        # Create a reply to comment1
        self.reply = Comment.objects.create(
            post=self.post,
            author=self.user,
            content="This is a reply",
            # parent=self.comment1
        )

        # Login
        url = reverse('token_obtain_pair')
        resp = self.client.post(url, {'username': 'testuser', 'password': 'password123'})
        self.token = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
    
    def test_get_comments_for_post(self):
        """Test retrieving comments for a specific post"""
        url = reverse('comment_list', kwargs={'post_id': self.post.id})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Only 2 top-level comments should be returned (not the reply)
        # self.assertEqual(len(response.data), 2)
    
    def test_create_comment(self):
        """Test creating a new comment"""
        url = reverse('comment_create')
        data = {
            'post': self.post.id,
            'content': 'This is a new comment'
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 4)  # 3 initial + 1 new
        self.assertEqual(response.data['content'], 'This is a new comment')
    
    # def test_create_reply(self):
    #     """Test creating a reply to a comment"""
    #     url = reverse('comment_create')
    #     data = {
    #         'post': self.post.id,
    #         'content': 'This is a new reply',
    #         'parent': self.comment1.id
    #     }
    #     response = self.client.post(url, data, format='json')
        
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(Comment.objects.count(), 4)  # 3 initial + 1 new
    #     self.assertEqual(response.data['content'], 'This is a new reply')
        
    #     # Check the parent-child relationship
    #     new_comment = Comment.objects.get(content='This is a new reply')
    #     self.assertEqual(new_comment.parent.id, self.comment1.id)
    
    def test_get_comment_detail(self):
        """Test retrieving details for a specific comment"""
        url = reverse('comment_detail', kwargs={'comment_id': self.comment1.id})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], 'This is a test comment')
        # The reply should be included in the response
        # self.assertEqual(len(response.data['replies']), 1)
        # self.assertEqual(response.data['replies'][0]['content'], 'This is a reply')
    
    def test_update_comment(self):
        """Test updating a comment"""
        url = reverse('comment_update', kwargs={'comment_id': self.comment1.id})
        data = {'content': 'Updated comment content'}
        response = self.client.put(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.comment1.refresh_from_db()
        self.assertEqual(self.comment1.content, 'Updated comment content')
    
    def test_delete_comment(self):
        """Test deleting a comment"""
        url = reverse('comment_delete', kwargs={'comment_id': self.comment2.id})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # There should be 2 comments left (comment1 and the reply)
        self.assertEqual(Comment.objects.count(), 2)
        
    # def test_get_comment_replies(self):
    #     """Test retrieving replies for a specific comment"""
    #     url = reverse('comment_replies', kwargs={'comment_id': self.comment1.id})
    #     response = self.client.get(url)
        
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data), 1)
    #     self.assertEqual(response.data[0]['content'], 'This is a reply') 