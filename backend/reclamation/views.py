from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Reclamation
from .serializer import ReclamationSerializer
from django.utils import timezone



# Create your views here.

class ReclamationCreateView(generics.CreateAPIView):
    serializer_class = ReclamationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Returns Reclamations only for the authenticated user
        return Reclamation.objects.filter(provider=self.request.user.citoyen_profile)

    def perform_create(self, serializer):
        
        #serializer.save(provider=self.request.user.provider_profile)  # pass correct provider instance here
        now = timezone.now()
        serializer.save(
            citoyen=self.request.user.citoyen_profile,
            date_misajour=now  # optional: set it equal to date_soumission
        )

class UserReclamationListView(generics.ListAPIView):
    serializer_class = ReclamationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reclamation.objects.filter(citoyen=self.request.user.citoyen_profile)
    
class ReclamationDeleteView(generics.DestroyAPIView):
    serializer_class = ReclamationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reclamation.objects.filter(citoyen=self.request.user.citoyen_profile)
    
class ReclamationUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = ReclamationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only allows updating Reclamations owned by the authenticated provider
        return Reclamation.objects.filter(citoyen=self.request.user.citoyen_profile)
    