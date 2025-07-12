from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = "apis"

urlpatterns = [
    path("",include("user_management.urls", namespace="user_management")),
]