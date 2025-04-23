from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ..models import User

class AuthTests(APITestCase):
    username = 'testcase'
    email = 'testcase@test.com'
    password = 'testcasepass123'

    def setUp(self):
        self.user = User.objects.create_user(username=self.username, email=self.email, password=self.password)

    def test_register_user_with_valid_credentions(self):
        url = reverse('register_user')
        data = {'username': 'test2', 'email': 'test2@test.com', 'password': 'testpass123'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], 'test2')

    def test_register_user_with_invalid_credentials(self):
        url = reverse('register_user')
        data = {'username': 'test2', 'email': 'ajsdnaksjdnaksjd', 'password': 'pass'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_token_valid_credentials(self):
        url = reverse('token_obtain_pair')
        data = {'username': self.username, 'password': self.password}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_get_token_invalid_credentials(self):
        url = reverse('token_obtain_pair')
        data = {'username': 'wrong_user_username', 'password': '...'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn('access', response.data)
        self.assertNotIn('refresh', response.data)

    def test_refresh_token(self):
        url = reverse('token_obtain_pair')
        data = {'username': self.username, 'password': self.password}
        response = self.client.post(url, data, format='json')
        token = response.data['refresh']

        url = reverse('token_refresh')
        data = {'refresh': token}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)


    def test_blacklist_token(self):
        url = reverse('token_obtain_pair')
        data = {'username': self.username, 'password': self.password}
        response = self.client.post(url, data, format='json')
        token = response.data['refresh']

        url = reverse('token_blacklist')
        data = {'refresh': token}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_refresh_blacklisted_token(self):
        url = reverse('token_obtain_pair')
        data = {'username': self.username, 'password': self.password}
        response = self.client.post(url, data, format='json')
        token = response.data['refresh']

        url = reverse('token_blacklist')
        data = {'refresh': token}
        response = self.client.post(url, data, format='json')

        url = reverse('token_refresh')
        data = {'refresh': token}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn('access', response.data)

    def test_access_protected_endpoint_with_valid_token(self):
        url = reverse('token_obtain_pair')
        data = {'username': self.username, 'password': self.password}
        response = self.client.post(url, data, format='json')
        token = response.data['access']

        url = reverse('test_protected_endpoint')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'OK')

    def test_access_protected_endpoint_with_invalid_token(self):
        url = reverse('test_protected_endpoint')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer wrong-token')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_access_protected_endpoint_without_token(self):
        url = reverse('test_protected_endpoint')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
