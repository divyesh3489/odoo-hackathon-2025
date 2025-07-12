from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager,PermissionsMixin


class CustomUserManager(BaseUserManager):

    def create_user(self,email,username,password=None,**extra_fields):
        """
        Create and return a user with an email, username and password.
        """
        if not email:
            raise ValueError("The Email field must be set")
        if not username:
            raise ValueError("The Username field must be set")
        
        if not password:
            raise ValueError("The Password field must be set")
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self,email,username,password=None,**extra_fields):
        """
        Create and return a superuser with an email, username and password.
        """
        user = self.create_user(email,username,password,**extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    
class Users(AbstractUser,PermissionsMixin):
    """
    Custom User model that extends the default Django user model.
    """

    email = models.EmailField(unique=True, blank=False, null=False)
    username = models.CharField(max_length=150, unique=True, blank=False, null=False)
    password = models.CharField(max_length=128, blank=False, null=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    profile_image = models.ImageField(upload_to='user_profiles/', blank=True, null=True,default='user_profiles/default_profile.png')
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

