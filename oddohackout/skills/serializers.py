from rest_framework import serializers
from .models import Skills, UserSkills
from user_management.models import Users
from utils.constatnt import SkillTypeConstants

class SkillsSerializer(serializers.ModelSerializer):
    """
    Serializer for Skills model
    """
    class Meta:
        model = Skills
        fields = ['id', 'name', 'created_at']
        read_only_fields = ['created_at']

class UserSkillsSerializer(serializers.ModelSerializer):        
    """
    Serializer for UserSkills model
    """
    skill = serializers.CharField(source='skill.name', read_only=True)
    class Meta:
        model = UserSkills
        fields = ['skill', 'created_at']
        read_only_fields = ['created_at']
