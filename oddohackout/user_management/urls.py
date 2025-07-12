from django.contrib import admin
from django.urls import path
from user_management.views import  CustomTokenObtainPairView, UserCreateView, UserDetailUpdateView, GetUserListView,GetUserByIdView
from rest_framework_simplejwt.views import TokenRefreshView

app_name = "user_management"


urlpatterns = [
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("register/", UserCreateView.as_view(), name="register"),
    path("profile/", UserDetailUpdateView.as_view(), name="profile"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("users/", GetUserListView.as_view(), name="user_list"),
    path("users/<int:pk>/", GetUserByIdView.as_view(), name="user_detail_update"),
]
