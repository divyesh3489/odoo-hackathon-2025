from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Rating

User = get_user_model()

class RatingModelTest(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(
            email='user1@test.com',
            username='user1',
            password='testpass123'
        )
        self.user2 = User.objects.create_user(
            email='user2@test.com',
            username='user2', 
            password='testpass123'
        )

    def test_rating_creation(self):
        """Test creating a valid rating"""
        rating = Rating.objects.create(
            sender=self.user1,
            receiver=self.user2,
            rating_count=5,
            feedback="Great user!"
        )
        self.assertEqual(rating.sender, self.user1)
        self.assertEqual(rating.receiver, self.user2)
        self.assertEqual(rating.rating_count, 5)
        self.assertEqual(rating.feedback, "Great user!")

    def test_rating_str_method(self):
        """Test rating string representation"""
        rating = Rating.objects.create(
            sender=self.user1,
            receiver=self.user2,
            rating_count=4
        )
        expected_str = f"{self.user1.username} rated {self.user2.username}: 4/5"
        self.assertEqual(str(rating), expected_str)

    def test_self_rating_validation(self):
        """Test that users cannot rate themselves"""
        rating = Rating(
            sender=self.user1,
            receiver=self.user1,
            rating_count=5
        )
        with self.assertRaises(ValidationError):
            rating.full_clean()

    def test_unique_together_constraint(self):
        """Test that sender-receiver combination is unique"""
        Rating.objects.create(
            sender=self.user1,
            receiver=self.user2,
            rating_count=5
        )
        
        # Try to create another rating from same sender to same receiver
        with self.assertRaises(Exception):
            Rating.objects.create(
                sender=self.user1,
                receiver=self.user2,
                rating_count=3
            )


class RatingAPITest(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(
            email='user1@test.com',
            username='user1',
            password='testpass123'
        )
        self.user2 = User.objects.create_user(
            email='user2@test.com',
            username='user2',
            password='testpass123'
        )

    def test_create_rating_authenticated(self):
        """Test creating a rating when authenticated"""
        self.client.force_authenticate(user=self.user1)
        url = reverse('apis:ratings:rating-create')
        data = {
            'receiver': self.user2.id,
            'rating_count': 5,
            'feedback': 'Excellent user!'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Rating.objects.count(), 1)

    def test_create_rating_unauthenticated(self):
        """Test creating a rating when not authenticated"""
        url = reverse('apis:ratings:rating-create')
        data = {
            'receiver': self.user2.id,
            'rating_count': 5,
            'feedback': 'Excellent user!'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_self_rating(self):
        """Test that users cannot rate themselves via API"""
        self.client.force_authenticate(user=self.user1)
        url = reverse('apis:ratings:rating-create')
        data = {
            'receiver': self.user1.id,
            'rating_count': 5,
            'feedback': 'Self rating'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_rating(self):
        """Test updating a rating"""
        rating = Rating.objects.create(
            sender=self.user1,
            receiver=self.user2,
            rating_count=3,
            feedback="Good"
        )
        
        self.client.force_authenticate(user=self.user1)
        url = reverse('apis:ratings:rating-update-delete', kwargs={'pk': rating.id})
        data = {
            'receiver': self.user2.id,
            'rating_count': 5,
            'feedback': 'Excellent!'
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        rating.refresh_from_db()
        self.assertEqual(rating.rating_count, 5)
        self.assertEqual(rating.feedback, 'Excellent!')

    def test_delete_rating(self):
        """Test deleting a rating"""
        rating = Rating.objects.create(
            sender=self.user1,
            receiver=self.user2,
            rating_count=4
        )
        
        self.client.force_authenticate(user=self.user1)
        url = reverse('apis:ratings:rating-update-delete', kwargs={'pk': rating.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Rating.objects.count(), 0)
