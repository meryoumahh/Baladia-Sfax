from rest_framework import serializers
from .models import Reclamation
from userauth.models import CitoyenProfile, AgentProfile
from userauth.serializers import AgentSerializer, CitoyenSerializer
class ReclamationSerializer(serializers.ModelSerializer):
    citoyen = CitoyenSerializer(read_only=True)
    agent = AgentSerializer(read_only=True)
    class Meta:
        model = Reclamation
        fields = ['id', 'citoyen' ,'agent', 'titre', 'description', 'category', 'status',  'localization', 'picture']
        read_only_fields = ['id', 'date_soumission', 'date_misajour', 'citoyen']

    