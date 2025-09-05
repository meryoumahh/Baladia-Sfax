
from django.utils import timezone
from  rest_framework import serializers
# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import uuid

# Custom manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        
        return self.create_user(email, password, **extra_fields)


# Custom user model
class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ("citoyen", "Citoyen"),
        ("agent", "Agent"),
        ("admin", "Admin"),
    ]

    userId = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)  # unique string ID
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # optional, AbstractBaseUser already has password
    telephone = models.CharField(max_length=20, blank=True, null=True)

    dateOfCreation = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="citoyen")

    # Django auth fields
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # must be True for admin login

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['telephone']

    objects = CustomUserManager()

    
    def __str__(self):
        return self.email

    


    # Optional: automatically set is_staff based on role
    def save(self, *args, **kwargs):
        if self.role == "agent":
            self.is_staff = False
        elif self.role == "admin":
            self.is_staff = True
            self.is_superuser = True
        super().save(*args, **kwargs)




class CitoyenProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="citoyen_profile")

    
        
    telephone = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=255, default="No address provided")
    dateOfBirth = models.DateField( default=timezone.now)
    cin = models.ImageField(upload_to="cins/", blank=True, null=True, default="default_cin.jpg")
    
    
    
class AgentProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="agent_profile")
    class ServiceCategory(models.TextChoices):
        LIGHT = 'LIGHT', 'LIGHT'
        ROAD = 'ROAD', 'ROAD'
        ALL='ALL', 'ALL'
        # Add other categories as needed
    
    serviceCategory = models.CharField(
        max_length=30,
        choices=ServiceCategory.choices,
        default=ServiceCategory.ALL,
    )

