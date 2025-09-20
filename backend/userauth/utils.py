"""
Utility functions for user authentication and security
"""
import secrets
import string
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.hashers import make_password

def generate_secure_password(length=12):
    """Generate a cryptographically secure password"""
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    password = ''.join(secrets.choice(alphabet) for _ in range(length))
    return password

def send_password_email(user_email, password, user_name):
    """Send password to agent via email (for demo purposes only)"""
    subject = 'Votre mot de passe Baladia'
    message = f"""
    Bonjour {user_name},
    
    Votre compte agent a été créé avec succès.
    Mot de passe temporaire: {password}
    
    Veuillez changer ce mot de passe lors de votre première connexion.
    
    Cordialement,
    L'équipe Baladia
    """
    
    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user_email],
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False

class PasswordValidator:
    """Custom password validation"""
    
    @staticmethod
    def validate_password_strength(password):
        """Validate password meets security requirements"""
        errors = []
        
        if len(password) < 8:
            errors.append("Password must be at least 8 characters long")
            
        if not any(c.isupper() for c in password):
            errors.append("Password must contain at least one uppercase letter")
            
        if not any(c.islower() for c in password):
            errors.append("Password must contain at least one lowercase letter")
            
        if not any(c.isdigit() for c in password):
            errors.append("Password must contain at least one digit")
            
        return errors