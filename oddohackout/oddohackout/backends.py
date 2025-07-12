from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

User = get_user_model()

class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None or password is None:
            return None
        user = None
        # Try email first
        try:
            user = User.objects.get(email__iexact=username)
        except User.DoesNotExist:
            # Try username second
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return None

        if user and user.check_password(password):
            return user

        return None