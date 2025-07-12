from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from user_management.serializers import CustomTokenObtainPairSerializer,UserSerializer,UserDetailUpdateDeleteSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from skills.serializers import UserSkillsSerializer
from skills.models import UserSkills
from ratings.models import Rating
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Avg, Count


# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserCreateView(CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = self.serializer_class.Meta.model.objects.get(pk=response.data['id'])
        refresh = RefreshToken.for_user(user)
        response.data['refresh_token'] = str(refresh)
        response.data['access_token'] = str(refresh.access_token)
        return response


class UserDetailUpdateView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserDetailUpdateDeleteSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user)
        data = serializer.data
        want_skills_queryset = UserSkills.objects.filter(user=user, type='want')
        offer_skills_queryset = UserSkills.objects.filter(user=user, type='offer')
        want_skills_serializer = UserSkillsSerializer(want_skills_queryset, many=True)
        offer_skills_serializer = UserSkillsSerializer(offer_skills_queryset, many=True)
        data['want_skills'] = want_skills_serializer.data
        data['offer_skills'] = offer_skills_serializer.data
        
        # Get user's rating statistics
        ratings_stats = Rating.objects.filter(receiver=user).aggregate(
            average_rating=Avg('rating_count'),
            total_ratings=Count('id')
        )

        
        data['average_rating'] = round(ratings_stats['average_rating'], 2) if ratings_stats['average_rating'] else 0
        data['total_ratings'] = ratings_stats['total_ratings']
        
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({"message":"profile deleted successfuly"},status=status.HTTP_204_NO_CONTENT)
    

class GetUserListView(APIView):
    def get(self, request, *args, **kwargs):
        # Get pagination parameters
        limit = int(request.GET.get('limit', 10))
        current_page = int(request.GET.get('current_page', 1))
        
        # Calculate offset
        offset = (current_page - 1) * limit
        
        User = get_user_model()
        
        # Filter active users
        active_users = User.objects.filter(
            is_banned=False,
            is_privete=False,
            is_active=True
        )
        
        # Get total count for pagination info
        total_users = active_users.count()
        
        # Apply pagination
        paginated_users = active_users[offset:offset + limit]
        
        user_list = []
        for user in paginated_users:
            user_data = UserSerializer(user).data
            want_skills = UserSkills.objects.filter(user=user, type='want')
            offer_skills = UserSkills.objects.filter(user=user, type='offer')
            user_data['want_skills'] = UserSkillsSerializer(want_skills, many=True).data
            user_data['offer_skills'] = UserSkillsSerializer(offer_skills, many=True).data

            # Get user's rating statistics
            ratings_stats = Rating.objects.filter(receiver=user).aggregate(
                average_rating=Avg('rating_count'),
                total_ratings=Count('id')
            )
            
            user_data['average_rating'] = round(ratings_stats['average_rating'], 2) if ratings_stats['average_rating'] else 0
            user_data['total_ratings'] = ratings_stats['total_ratings']
            
            user_list.append(user_data)

        # Calculate pagination metadata
        total_pages = (total_users + limit - 1) // limit
        has_next = current_page < total_pages
        has_previous = current_page > 1

        response_data = {
            'users': user_list,
            'pagination': {
                'current_page': current_page,
                'total_pages': total_pages,
                'total_users': total_users,
                'limit': limit,
                'has_next': has_next,
                'has_previous': has_previous
            }
        }

        return Response(response_data, status=status.HTTP_200_OK)
class GetUserByIdView(APIView):
    def get(self, request, pk, *args, **kwargs):
        try:
            user = get_user_model().objects.get(id=pk)
            if not user or user.is_banned or user.is_privete or not user.is_active:
                return Response({"error": "User not found or is inactive"}, status=status.HTTP_404_NOT_FOUND)
            user_data = UserSerializer(user).data
            want_skills = UserSkills.objects.filter(user=user, type='want')
            offer_skills = UserSkills.objects.filter(user=user, type='offer')
            user_data['want_skills'] = UserSkillsSerializer(want_skills, many=True).data
            user_data['offer_skills'] = UserSkillsSerializer(offer_skills, many=True).data
            
            # Get user's rating statistics
            ratings_stats = Rating.objects.filter(receiver=user).aggregate(
                average_rating=Avg('rating_count'),
                total_ratings=Count('id')
            )
            
            user_data['average_rating'] = round(ratings_stats['average_rating'], 2) if ratings_stats['average_rating'] else 0
            user_data['total_ratings'] = ratings_stats['total_ratings']
            
            return Response(user_data, status=status.HTTP_200_OK)
        except get_user_model().DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)