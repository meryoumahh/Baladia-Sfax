from django.contrib import admin
from .models import CustomUser, ClientProfile, ServiceProviderProfile
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(ClientProfile)
admin.site.register(ServiceProviderProfile)