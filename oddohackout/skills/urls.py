from django.urls import include, path
from rest_framework.routers import DefaultRouter
from skills.views import SkillsViewSet, UserSkillsViewSet

app_name = "skills"
router = DefaultRouter()
router.register(r'skills', SkillsViewSet, basename='skills')
router.register(r'user-skills', UserSkillsViewSet, basename='user-skills')
urlpatterns  = [
    path('', include(router.urls)),
]       