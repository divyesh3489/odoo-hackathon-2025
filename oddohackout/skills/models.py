from django.db import models
from user_management.models import Users
from utils.constatnt import SkillTypeConstants,StatusConstants

TYPE_CHOICES = [
        (SkillTypeConstants.WANT, 'Want'),
        (SkillTypeConstants.OFFER, 'Offer'),
    ]
# Create your models here.
class Skills(models.Model):
    """
    Model representing a skill
    """
    name = models.CharField(max_length=100, unique=True, help_text="Name of the skill")
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the skill was created")

    def __str__(self):
        return self.name

class UserSkills(models.Model):
    """
    Model representing the relationship between users and skills
    """
    user = models.ForeignKey(Users,on_delete=models.CASCADE, related_name='user_skills', help_text="User who has the skill")
    skill = models.ForeignKey(Skills, on_delete=models.CASCADE, related_name='user_skills', help_text="Skill that the user has")
    
    type = models.CharField(        
        max_length=20,
        choices=TYPE_CHOICES,
        help_text="Type of skill relationship - want or offer"
    )
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the user skill was created")
    
    class Meta:
        unique_together = ['user', 'skill', 'type']
    
    def __str__(self):
        return f"{self.user.username} - {self.skill.name} ({self.get_type_display()})"
    
status_choices = [
    (StatusConstants.PENDING, 'Pending'),
    (StatusConstants.APPROVED , 'Approved'),
    (StatusConstants.REJECTED, 'Rejected'),
    
    ]
class SkillRequest(models.Model):

    sender = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='skill_requests_sent', help_text="User who sent the request")
    receiver = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='skill_requests_received', help_text="User who received the request")
    wanted_skill = models.ForeignKey(Skills, on_delete=models.CASCADE, related_name='skill_requests', help_text="Skill that is being requested")
    offered_skill = models.ForeignKey(Skills, on_delete=models.CASCADE, related_name='skill_offers', help_text="Skill that is being offered")
    satatus = models.CharField(
        max_length=20,
        choices=status_choices, 
        default=StatusConstants.PENDING,
        help_text="Status of the skill request"
    )   
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the skill request was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="Timestamp when the skill request was last updated")
