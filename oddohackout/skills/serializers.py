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
    skill_id = serializers.IntegerField(source='skill.id', read_only=True)
    skill_name = serializers.CharField(source='skill.name', read_only=True)
    
    class Meta:
        model = UserSkills
        fields = ['skill_id', 'skill_name', 'type', 'created_at']
        read_only_fields = ['created_at']
