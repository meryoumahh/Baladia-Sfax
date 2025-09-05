
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
        ("client", "Client"),
        ("service_provider", "Service provider"),
        ("admin", "Admin"),
    ]

    userId = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)  # unique string ID
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # optional, AbstractBaseUser already has password
    telephone = models.CharField(max_length=20, blank=True, null=True)
    profilePicture = models.ImageField(upload_to="profile_pics/", blank=True, null=True, default="default_profile_pic.jpg")
    dateOfCreation = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="client")

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
        if self.role == "service_provider":
            self.is_staff = False
        elif self.role == "admin":
            self.is_staff = True
            self.is_superuser = True
        super().save(*args, **kwargs)




class ClientProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="customer_profile")

    class PaiementMethod(models.TextChoices):
        CASH = 'CASH', 'CASH'
        VIREMENT = 'VIREMENT', 'VIREMENT'
        CREDIT_CARD = 'CREDIT_CARD', 'CREDIT_CARD'
        PAYPAL = 'PAYPAL', 'PAYPAL'
        
        
    class Preferences(models.TextChoices):
        AUTRE = 'AUTRE', 'Autre'
        AVENTURE = 'AVENTURE', 'Voyage d\'aventure'
        PLAGE = 'PLAGE', 'Plage & Détente'
        CULTURE = 'CULTURE', 'Circuits Culturels & Historiques'
        NATURE = 'NATURE', 'Nature & Randonnée'
        ROAD_TRIP = 'ROAD_TRIP', 'Voyage en Route'
        LUXE = 'LUXE', 'Voyage de Luxe'
        CROISIERE = 'CROISIERE', 'Croisières'
        BIEN_ETRE = 'BIEN_ETRE', 'Bien-être & Spa'
        GASTRONOMIE = 'GASTRONOMIE', 'Gastronomie & Expériences Culinaires'
        FESTIVALS = 'FESTIVALS', 'Festivals & Événements'
        SPORT = 'SPORT', 'Sports & Activités en Plein Air'
        FAMILLE = 'FAMILLE', 'Voyage en Famille'

        

    address = models.CharField(max_length=255, default="No address provided")
    dateOfBirth = models.DateField( default=timezone.now)
    
    preferences = models.CharField(
        max_length=30,
        choices=Preferences.choices,
        default=Preferences.AUTRE,
    )

    paiementMethod = models.CharField(
        max_length=100,
        choices=PaiementMethod.choices,
        default=PaiementMethod.CASH,
    )
    
class ServiceProviderProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="provider_profile")
    class ServiceCategory(models.TextChoices):
        TOUR_GUIDE = 'TOUR_GUIDE', 'Guide Touristique'
        TRANSPORT = 'TRANSPORT', 'Transportation'
        ACCOMMODATION = 'ACCOMMODATION', 'Accommodation'
        RESTAURANTCAFFE = 'RESTAURANTCAFFE', 'Restaurant & Cafe'
        # Add other categories as needed
        
        
    AgenceId = models.CharField(max_length=100)
    businessName = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    rate = models.IntegerField(default=0)
    contactInfo = models.CharField(max_length=255, default="No contact info provided")  
    Packages = models.CharField(max_length=255, default="No packages available")
    serviceCategory = models.CharField(
        max_length=30,
        choices=ServiceCategory.choices,
        default=ServiceCategory.ACCOMMODATION,
    )

