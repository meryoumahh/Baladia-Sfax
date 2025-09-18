from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password

User = get_user_model()

class PlainTextAgentBackend(BaseBackend):
    """
    Custom authentication backend for agents with plain text passwords
    """
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=email)
            # Check if user is an agent and has plain text password
            if user.role == 'agent' and user.password == password:
                return user
            # For non-agents, use regular password checking
            elif user.role != 'agent' and check_password(password, user.password):
                return user
        except User.DoesNotExist:
            return None
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None