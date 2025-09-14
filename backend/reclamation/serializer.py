from rest_framework import serializers
from .models import Reclamation
from userauth.models import CitoyenProfile, AgentProfile
from userauth.serializers import AgentSerializer, CitoyenSerializer

class ReclamationDetailsSerializer(serializers.ModelSerializer):
    citoyen = CitoyenSerializer(read_only=True)
    agent = AgentSerializer(read_only=True)
    class Meta:
        model = Reclamation
        fields = ['id', 'citoyen' ,'agent', 'titre', 'description', 'category', 'status', 'date_soumission', 'date_misajour', 'localization', 'picture']
        read_only_fields = ['id', 'date_soumission', 'date_misajour', 'citoyen','status']


class ReclamationDetailsAgentSerializer(serializers.ModelSerializer):
    agent = AgentSerializer(read_only=True)
    class Meta:
        model = Reclamation
        fields = ['id', 'agent', 'titre', 'description', 'category', 'status',  'localization', 'picture']
        read_only_fields = ['id', 'date_soumission', 'date_misajour']

# For agent assignment (admins/agents assign cases)
class ReclamationAssignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclamation
        fields = ['agent']

# For creation (citizens submit reclamations)
class ReclamationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclamation
        fields = ['id' ,'titre', 'description', 'category', 'localization', 'picture', 'citoyen']
        read_only_fields = ['id', 'date_soumission', 'date_misajour', 'citoyen']
#for status 
class ReclamationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclamation
        fields = ['status']