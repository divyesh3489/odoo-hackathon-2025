from django.contrib import admin
from django.urls import path
from user_management.views import  CustomTokenObtainPairView, UserCreateView, UserDetailUpdateView

app_name = "user_management"


urlpatterns = [
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("register/", UserCreateView.as_view(), name="register"),
    path("profile/", UserDetailUpdateView.as_view(), name="profile"),
]
