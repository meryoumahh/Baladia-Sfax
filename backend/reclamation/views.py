from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Reclamation
from .serializer import ReclamationDetailsSerializer, ReclamationCreateSerializer, ReclamationDetailsAgentSerializer,ReclamationStatusSerializer,ReclamationAssignSerializer
from django.utils import timezone



# Create your views here.

class ReclamationCreateView(generics.CreateAPIView):
    serializer_class = ReclamationCreateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Returns Reclamations only for the authenticated user
        return Reclamation.objects.filter(citoyen=self.request.user.citoyen_profile)

    def perform_create(self, serializer):
        
        #serializer.save(provider=self.request.user.provider_profile)  # pass correct provider instance here
        now = timezone.now()
        serializer.save(
            citoyen=self.request.user.citoyen_profile,
            date_misajour=now  # optional: set it equal to date_soumission
        )

class ReclamationListView(generics.ListAPIView):
    serializer_class = ReclamationDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Reclamation.objects.all()
        return Reclamation.objects.filter(citoyen=self.request.user.citoyen_profile)
    

class ReclamationListAgentView(generics.ListAPIView):
    serializer_class = ReclamationDetailsAgentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reclamation.objects.filter(agent=self.request.user.agent_profile)
    
class ReclamationDeleteView(generics.DestroyAPIView):
    serializer_class = ReclamationDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Reclamation.objects.all()
        return Reclamation.objects.filter(citoyen=self.request.user.citoyen_profile)
    
class ReclamationUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = ReclamationDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Reclamation.objects.all()
        # Only allows updating Reclamations owned by the authenticated provider
        return Reclamation.objects.filter(citoyen=self.request.user.citoyen_profile)
    

class ReclamationStatusUpdateView(generics.UpdateAPIView):
    serializer_class = ReclamationStatusSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        if self.request.user.is_superuser:
            return Reclamation.objects.all()
        # Only allows updating Reclamations owned by the authenticated provider
        return Reclamation.objects.filter(agent=self.request.user.agent_profile)


class ReclamationAssignAgentView(generics.UpdateAPIView):
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationAssignSerializer

