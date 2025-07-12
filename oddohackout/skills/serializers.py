from rest_framework import serializers
from .models import Skills, UserSkills, SkillRequest
from user_management.models import Users
from utils.constatnt import SkillTypeConstants,StatusConstants

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

class SkillRequestSerializer(serializers.ModelSerializer):
    """
    Serializer for SkillRequest model
    Handles: {receiver: 1, wanted_skill: "python", offered_skill: "JavaScript"}
    """
    # Write-only fields for creation
    wanted_skill = serializers.CharField(write_only=True, help_text="Name of the skill being requested")
    offered_skill = serializers.CharField(write_only=True, help_text="Name of the skill being offered")
    
    # Read-only fields for response
    wanted_skill_name = serializers.CharField(source='wanted_skill.name', read_only=True)
    offered_skill_name = serializers.CharField(source='offered_skill.name', read_only=True)
    status = serializers.CharField(source='get_satatus_display', read_only=True)

    class Meta:
        model = SkillRequest
        fields = [
            'id', 'receiver', 'wanted_skill', 'offered_skill', 
            'wanted_skill_name', 
            'offered_skill_name','status',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'wanted_skill_name', 
                           'offered_skill_name', 'status_display', 'created_at', 'updated_at']


    def create(self, validated_data):
        """
        Create skill request with proper skill objects
        """
        # Get authenticated user as sender
        sender = self.context['request'].user
        
        # Get skill names from validated data
        wanted_skill_name = validated_data.pop('wanted_skill')
        offered_skill_name = validated_data.pop('offered_skill')
        
        # Get skill objects
        wanted_skill = Skills.objects.get(name=wanted_skill_name)
        offered_skill = Skills.objects.get(name=offered_skill_name)
        
        # Create the skill request
        skill_request = SkillRequest.objects.create(
            sender=sender,
            receiver=validated_data['receiver'],
            wanted_skill=wanted_skill,
            offered_skill=offered_skill,
            satatus=StatusConstants.PENDING
        )
        
        return skill_request
    def update(self, instance, validated_data):
        instance.satatus = validated_data.get('status', instance.satatus)
        return super().update(instance, validated_data)