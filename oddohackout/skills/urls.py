from django.urls import include, path
from rest_framework.routers import DefaultRouter
from skills.views import SkillsViewSet, UserSkillsViewSet, SkillRequestViewSet,SkillSenderView

app_name = "skills"
router = DefaultRouter()
router.register(r'skills', SkillsViewSet, basename='skills')
router.register(r'user-skills', UserSkillsViewSet, basename='user-skills')
router.register(r'skill-requests', SkillRequestViewSet, basename='skill-requests')
urlpatterns  = [
    path('', include(router.urls)),
    path('skill-sender/', SkillSenderView.as_view(), name='skill-sender'),
]       