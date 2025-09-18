from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Count, Q
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
        try:
            return Reclamation.objects.filter(agent=self.request.user.agent_profile)
        except AttributeError:
            return Reclamation.objects.none()  # Return empty queryset

    
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
    permission_classes = [IsAuthenticated]
    
    def perform_update(self, serializer):
        if not self.request.user.is_superuser:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Only administrators can assign agents")
        serializer.save()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_stats(request):
    user = request.user
    
    # Check if user has citoyen_profile
    try:
        citoyen_profile = user.citoyen_profile
    except AttributeError:
        return Response({
            'resolu': 0,
            'en_cours': 0, 
            'en_attente': 0,
            'error': 'No citoyen profile'
        })
    
    # Get all reclamations for this user
    user_reclamations = Reclamation.objects.filter(citoyen=citoyen_profile)
    total_count = user_reclamations.count()
    
    # Get all status values to see what's actually in DB
    all_statuses = list(user_reclamations.values_list('status', flat=True))
    
    # Count by status
    resolu_count = user_reclamations.filter(status='Résolu').count()
    en_cours_count = user_reclamations.filter(status='En cours').count()
    en_attente_count = user_reclamations.filter(status='En attente').count()
    
    return Response({
        'resolu': resolu_count,
        'en_cours': en_cours_count,
        'en_attente': en_attente_count,
        'debug': {
            'total_reclamations': total_count,
            'all_statuses': all_statuses,
            'user_id': user.id
        }
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def validate_reclamation(request, pk):
    if not request.user.is_superuser:
        return Response({'error': 'Only admin can validate reclamations'}, status=403)
    
    try:
        reclamation = Reclamation.objects.get(pk=pk)
        reclamation.validate = True
        reclamation.save()
        return Response({'message': 'Reclamation validated successfully'})
    except Reclamation.DoesNotExist:
        return Response({'error': 'Reclamation not found'}, status=404)

