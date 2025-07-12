from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager,PermissionsMixin
from django_utils import choices
from utils.constatnt import AvailabilityConstants


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

    class AvailabilityChoices(choices.Choices):
        Weekdays = choices.Choice(AvailabilityConstants.WEEKDAYS, 'Weekdays')
        Weekends = choices.Choice(AvailabilityConstants.WEEKENDS, 'Weekends')
        Evenings = choices.Choice(AvailabilityConstants.EVEINGS, 'Evenings')
        Mornings = choices.Choice(AvailabilityConstants.MORNINGS, 'Mornings')
        Afternoons = choices.Choice(AvailabilityConstants.AFTERNOONS, 'Afternoons')
        Nights = choices.Choice(AvailabilityConstants.NIGHTS, 'Nights')
        Monday = choices.Choice(AvailabilityConstants.MONDAYS, 'Monday')
        Tuesday = choices.Choice(AvailabilityConstants.TUESDAYS, 'Tuesday')
        Wednesday = choices.Choice(AvailabilityConstants.WEDNESDAYS, 'Wednesday')
        Thursday = choices.Choice(AvailabilityConstants.THURSDAYS, 'Thursday')
        Friday = choices.Choice(AvailabilityConstants.FRIDAYS, 'Friday')
        Saturday = choices.Choice(AvailabilityConstants.SATURDAYS, 'Saturday')
        Sunday = choices.Choice(AvailabilityConstants.SUNDAYS, 'Sunday')

    email = models.EmailField(unique=True, blank=False, null=False)
    username = models.CharField(max_length=150, unique=True, blank=False, null=False)
    password = models.CharField(max_length=128, blank=False, null=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    profile_image = models.ImageField(upload_to='user_profiles/', blank=True, null=True,default='user_profiles/default_profile.png')
    availability = models.JSONField(default=list, blank=True, help_text="Select multiple availability options")
    is_banned = models.BooleanField(default=False, help_text="Indicates if the user is banned from the platform")
    is_privete =  models.BooleanField(default=False, help_text="Indicates if the user profile is private")
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def clean(self):
        """Validate that availability contains only valid choices"""
        from django.core.exceptions import ValidationError
        if self.availability:
            valid_choices = [choice for choice, _ in self.AvailabilityChoices]
            for item in self.availability:
                if item not in valid_choices:
                    raise ValidationError(f"'{item}' is not a valid availability choice")
    
    def get_availability_display(self):
        """Return human-readable availability options"""
        if not self.availability:
            return []
        choice_dict = dict(self.AvailabilityChoices)
        return [choice_dict.get(item, item) for item in self.availability]
    
    def __str__(self):
        return str(self.id) + " - " + self.username

