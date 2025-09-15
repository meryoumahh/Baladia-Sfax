from django.utils import timezone
from  rest_framework import serializers
from django.db import models
import userauth.models as userauth
# Create your models here.
class Reclamation(models.Model):
    CATEGORY_CHOICES = [
        ('infrastructures critiques', 'Infrastructures critiques'),
        ('environnement proprete', 'Environnement et propreté'),
        ('energie electricite', 'Énergie et électricité'),
        ('assainissement eau', 'Assainissement et eau'),
        ('transport stationnement', 'Transport et stationnement'),
        ('trottoirs mobilite douce', 'Trottoirs et mobilité douce'),
        ('voirie routes', 'Voirie et routes'),
        ('eclairage public', 'Éclairage public'),
    ]

    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('in_progress', 'En cours'),
        ('resolved', 'Résolu'),
    ]

    citoyen = models.ForeignKey(
        userauth.CitoyenProfile,
        on_delete=models.CASCADE,
        related_name='client_reclamations',
    )
    agent = models.ForeignKey(
        userauth.AgentProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='agent_reclamations'
    )
    titre = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    date_soumission = models.DateTimeField(auto_now_add=True)
    date_misajour = models.DateTimeField(auto_now=True)
    localization = models.CharField(max_length=255)
    picture = models.ImageField(upload_to='problems/', blank=True, null=True)

    def __str__(self):
        return f"{self.titre} - {self.get_category_display()}"
