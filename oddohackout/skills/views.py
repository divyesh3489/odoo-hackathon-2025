from django.shortcuts import render
from skills.models import Skills, UserSkills
from skills.serializers import SkillsSerializer, UserSkillsSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from user_management.models import Users
from utils.constatnt import SkillTypeConstants
from utils.paginator import CustomPagination
# Create your views here.

class SkillsViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing skills
    """
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSkillsViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing user skills
    """
    serializer_class = UserSkillsSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    
    def get_queryset(self):
        """
        Filter user skills by current user
        """
        return UserSkills.objects.filter(user=self.request.user)
    
    def list(self, request, *args, **kwargs):
        """
        List user's skills grouped by type
        """
        queryset = self.get_queryset()
        
        want_skills = queryset.filter(type=SkillTypeConstants.WANT)
        offer_skills = queryset.filter(type=SkillTypeConstants.OFFER)
        
        want_serializer = self.get_serializer(want_skills, many=True)
        offer_serializer = self.get_serializer(offer_skills, many=True)
        
        return Response({
            'want': want_serializer.data,
            'offer': offer_serializer.data
        })
    
    def create(self, request, *args, **kwargs):
        """
        Create user skills - handles both single and multiple skills
        Single: {user: 1, skill: 1, type: "want"}
        Multiple: {type: "want", skills: ["python", "js", "next.js"]}
        """
        data = request.data.copy()
        
        # Check if it's bulk creation format
        if 'skills' in data and 'type' in data:
            return self._handle_bulk_creation(data)
        else:
            return self._handle_single_creation(data)
    
    def _handle_single_creation(self, data):
        """
        Handle single skill creation
        """
        data['user'] = self.request.user.id
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def _handle_bulk_creation(self, data):
        """
        Handle multiple skills creation
        Expected format: {type: "want", skills: ["python", "js", "next.js"]}
        """
        skill_type = data.get('type')
        skill_names = data.get('skills', [])
        
        # Validate type
        valid_types = [SkillTypeConstants.WANT, SkillTypeConstants.OFFER]
        if skill_type not in valid_types:
            return Response({
                'error': f'Type must be one of: {valid_types}'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate skills list
        if not skill_names or not isinstance(skill_names, list):
            return Response({
                'error': 'Skills must be a non-empty list'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Remove duplicates and clean skill names
        cleaned_skills = []
        for skill in skill_names:
            if isinstance(skill, str):
                skill_name = skill.strip().title()
                if skill_name and skill_name not in cleaned_skills:
                    cleaned_skills.append(skill_name)
        
        if not cleaned_skills:
            return Response({
                'error': 'No valid skills provided'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Process skills
        user = self.request.user
        created_user_skills = []
        created_skills = []
        existing_skills = []
        already_exists = []
        
        for skill_name in cleaned_skills:
            # Get or create the skill
            skill, created = Skills.objects.get_or_create(
                name__iexact=skill_name,
                defaults={'name': skill_name}
            )
            
            if created:
                created_skills.append(skill.name)
            else:
                existing_skills.append(skill.name)
            
            # Create user skill if it doesn't exist
            user_skill, user_skill_created = UserSkills.objects.get_or_create(
                user=user,
                skill=skill,
                type=skill_type,
                defaults={
                    'user': user,
                    'skill': skill,
                    'type': skill_type
                }
            )
            
            if user_skill_created:
                # Use the serializer to format the response
                serializer = self.get_serializer(user_skill)
                created_user_skills.append(serializer.data)
            else:
                already_exists.append(skill.name)
        
        return Response({
            'message': 'User skills processed successfully',
            'data': {
                'created_user_skills': created_user_skills,
                'created_skills': created_skills,
                'existing_skills': existing_skills,
                'already_exists': already_exists,
                'total_processed': len(cleaned_skills)
            }
        }, status=status.HTTP_201_CREATED)
