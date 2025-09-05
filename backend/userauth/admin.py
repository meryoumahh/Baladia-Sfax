from django.contrib import admin
from .models import CustomUser, CitoyenProfile, AgentProfile
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(CitoyenProfile)
admin.site.register(AgentProfile)