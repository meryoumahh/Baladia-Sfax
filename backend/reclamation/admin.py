from django.contrib import admin
from .models import Reclamation

@admin.register(Reclamation)
class ReclamationAdmin(admin.ModelAdmin):
    list_display = ['titre', 'citoyen', 'category', 'status', 'date_soumission', 'date_misajour']
    list_filter = ['status', 'category', 'date_soumission']
    readonly_fields = ['date_soumission', 'date_misajour']