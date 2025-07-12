from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()

class Rating(models.Model):
    """
    Rating model for users to rate each other
    """
    sender = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='given_ratings',
        help_text="User who is giving the rating"
    )
    receiver = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='received_ratings',
        help_text="User who is receiving the rating"
    )
    rating_count = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Rating between 1 and 5"
    )
    feedback = models.TextField(blank=True, null=True, help_text="Optional feedback text")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'ratings'
        unique_together = ['sender', 'receiver']  # Prevent duplicate ratings from same sender to same receiver
        ordering = ['-created_at']
        verbose_name = 'Rating'
        verbose_name_plural = 'Ratings'

    def __str__(self):
        return f"{self.sender.username} rated {self.receiver.username}: {self.rating_count}/5"

    def clean(self):
        """Custom validation"""
        from django.core.exceptions import ValidationError
        if self.sender == self.receiver:
            raise ValidationError("Users cannot rate themselves")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
