from rest_framework.serializers import ModelSerializer, Serializer
from .models import CustomUser, ClientProfile, ServiceProviderProfile
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator  # <-- import from here
from datetime import date
#class CustomUserSerializer(ModelSerializer):
#    class Meta:
#       model = CustomUser
#        fields = ['id', 'userId','first_name','last_name', 'email', 'password', 'telephone', 'profilePicture', 'dateOfCreation', 'role', 'is_active', 'is_staff', 'is_superuser']



class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name','last_name', 'email', 'password', 'telephone','role']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_first_name(self, first_name):
        if any(char.isdigit() for char in first_name):
            raise serializers.ValidationError("Le prénom ne peut pas contenir de chiffres.")
        return first_name
    def validate_last_name(self, value):
        if any(char.isdigit() for char in value):
            raise serializers.ValidationError("Le nom ne peut pas contenir de chiffres.")
        return value

    # Email validation is handled by EmailField
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )

    # Password validation
    def validate_password(self, value):
        validate_password(value)
        return value

    



    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # Hash password
        user.save()
        return user

class ClientSignupSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = ClientProfile
        fields = ['user', 'address', 'dateOfBirth', 'paiementMethod', 'preferences']
        

    def validate_dateOfBirth(self, value):
        today = date.today()
        if value > today:
            raise serializers.ValidationError("La date de naissance ne peut pas être dans le futur.")
        if (today.year - value.year) < 13:
            raise serializers.ValidationError("L'utilisateur doit avoir au moins 13 ans.")
        return value
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['role'] = 'client'
        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
        profile = ClientProfile.objects.create(user=user, **validated_data)
        return profile


class ServiceProviderSignupSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = ServiceProviderProfile
        fields = ['user', 'AgenceId', 'businessName', 'location',  'serviceCategory']
        

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['role'] = 'service_provider'
        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
        profile = ServiceProviderProfile.objects.create(user=user, **validated_data)
        return profile
    
#class ClientSignupSerializer(serializers.ModelSerializer):
#    user = CustomUserSerializer()
#    class Meta:
#        model = ClientProfile
#        fields = ['user', 'address', 'dateOfBirth', 'paiementMethod', 'preferences']
#        db_table = "Clients"

#    def validate_dateOfBirth(self, value):
#        today = date.today()
#        if value > today:
#            raise serializers.ValidationError("La date de naissance ne peut pas être dans le futur.")
#        if (today.year - value.year) < 13:
#            raise serializers.ValidationError("L'utilisateur doit avoir au moins 13 ans.")
#        return value
    
#    def create(self, validated_data):
#        user_data = validated_data.pop('user')
#        user_data['role'] = 'client'
#        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
#        profile = ClientProfile.objects.create(user=user, **validated_data)
#        return profile



#class ServiceProviderSignupSerializer(serializers.ModelSerializer):
#    user = CustomUserSerializer()

#    class Meta:
#        model = ServiceProviderProfile
#        fields = ['user', 'AgenceId', 'businessName', 'contactInfo', 'location', 'rate', 'Packages', 'serviceCategory']
        

#    def create(self, validated_data):
#        user_data = validated_data.pop('user')
#        user_data['role'] = 'service_provider'
#        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
#        profile = ServiceProviderProfile.objects.create(user=user, **validated_data)
#        return profile






#class UserRegistrationSerializer(ModelSerializer):
#    class Meta:
#        model = CustomUser
#        fields = ['id', 'userId','first_name','last_name', 'email', 'password', 'telephone', 'profilePicture',  'role' ]
#        extra_kwargs = {'password': {'write_only': True}}

#    def create(self, validated_data):
#        user = CustomUser.objects.create_user(
#            email=validated_data['email'],
#            password=validated_data['password'],
#            first_name=validated_data.get('first_name', ''),
#            last_name=validated_data.get('last_name', ''),
#            telephone=validated_data.get('telephone', ''),
#            profilePicture=validated_data.get('profilePicture', None),
#            role=validated_data.get('role', 'user')
#        )
#        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User account is disabled.")
                data['user'] = user
                return data
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must provide email and password.")