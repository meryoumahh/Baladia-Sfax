from rest_framework.serializers import ModelSerializer, Serializer
from .models import CustomUser, CitoyenProfile, AgentProfile
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from datetime import date
from django.core.exceptions import ValidationError
from .utils import PasswordValidator
#class CustomUserSerializer(ModelSerializer):
#    class Meta:
#       model = CustomUser
#        fields = ['id', 'userId','first_name','last_name', 'email', 'password', 'telephone', 'profilePicture', 'dateOfCreation', 'role', 'is_active', 'is_staff', 'is_superuser']



class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name','last_name', 'email', 'password','telephone','role', 'is_staff']
        extra_kwargs = {'password': {'write_only': True}}
        extra_kwargs = {'is_staff': {'read_only': True}}
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
        # Use Django's built-in validation
        validate_password(value)
        
        # Add custom validation
        errors = PasswordValidator.validate_password_strength(value)
        if errors:
            raise serializers.ValidationError(errors)
            
        return value

    



    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # Hash password
        user.save()
        return user

class CitoyenSignupSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = CitoyenProfile
        fields = ['user', 'address', 'dateOfBirth', 'cin'] #omitted the cin since im still working on how to add it 
        

    def validate_dateOfBirth(self, value):
        today = date.today()
        if value > today:
            raise serializers.ValidationError("La date de naissance ne peut pas être dans le futur.")
        if (today.year - value.year) < 13:
            raise serializers.ValidationError("L'utilisateur doit avoir au moins 13 ans.")
        return value
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['role'] = 'citoyen'
        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
        profile = CitoyenProfile.objects.create(user=user, **validated_data)
        return profile


class AgentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name','last_name', 'email', 'password','telephone','role', 'is_staff']
        extra_kwargs = {'password': {'write_only': True}}
        extra_kwargs = {'is_staff': {'read_only': True}}
    
    def validate_first_name(self, first_name):
        if any(char.isdigit() for char in first_name):
            raise serializers.ValidationError("Le prénom ne peut pas contenir de chiffres.")
        return first_name
    
    def validate_last_name(self, value):
        if any(char.isdigit() for char in value):
            raise serializers.ValidationError("Le nom ne peut pas contenir de chiffres.")
        return value

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # Hash the password properly
        user.save()
        return user

class AgentCreationSerializer(serializers.ModelSerializer):
    user = AgentUserSerializer()
    plain_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = AgentProfile
        fields = ['user', 'serviceCategory', 'plain_password']
        

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        plain_password = validated_data.pop('plain_password', '')
        user_data['role'] = 'agent'
        user = AgentUserSerializer.create(AgentUserSerializer(), validated_data=user_data)
        profile = AgentProfile.objects.create(user=user, plain_password=plain_password, **validated_data)
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
        



class AgentSerializer(serializers.ModelSerializer):
            user = CustomUserSerializer(read_only=True) 
            class Meta:
                model = AgentProfile
                fields = ['user',  'serviceCategory']  # Adjust if 'user' needs to be full name

            def to_representation(self, instance):
                rep = super().to_representation(instance)
                # Add all needed user fields from the related user object
                rep['id'] = instance.id  # Use AgentProfile ID, not user ID
                rep['user_id'] = instance.user.id  # Keep user ID as separate field
                rep['email'] = instance.user.email
                rep['first_name'] = instance.user.first_name
                rep['last_name'] = instance.user.last_name
                rep['phone'] = instance.user.telephone  # Assuming field name is 'telephone'
                # Optionally add a combined name field
                rep['staff'] = instance.user.is_staff
                rep['name'] = f"{instance.user.first_name} {instance.user.last_name}"
                rep['plain_password'] = instance.plain_password  # Include plain password
                # Remove the nested user key as it's replaced by explicit fields
                rep.pop('user')
                return rep
            


class CitoyenSerializer(serializers.ModelSerializer):
            user = CustomUserSerializer(read_only=True) 
            class Meta:
                model = CitoyenProfile
                fields = ['user',   'address' , 'dateOfBirth', 'cin']  # Adjust if 'user' needs to be full name

            def to_representation(self, instance):
                rep = super().to_representation(instance)
                # Add all needed user fields from the related user object
                rep['id'] = instance.id  # Use CitoyenProfile ID for validation
                rep['user_id'] = instance.user.id  # Keep user ID as separate field
                rep['email'] = instance.user.email
                rep['first_name'] = instance.user.first_name
                rep['last_name'] = instance.user.last_name
                rep['phone'] = instance.user.telephone  # Assuming field name is 'telephone'
                # Optionally add a combined name field
                rep['staff'] = instance.user.is_staff
                rep['address'] = instance.address
                rep['dateOfBirth'] = instance.dateOfBirth
                rep['isValid'] = instance.isValid
                rep['cin'] = instance.cin.url if instance.cin and hasattr(instance.cin, 'url') else None               
                rep['name'] = f"{instance.user.first_name} {instance.user.last_name}"
                # Remove the nested user key as it's replaced by explicit fields
                rep.pop('user')
                return rep

class UserInfoSerializer(serializers.ModelSerializer):
    citoyen_profile = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'telephone', 'role', 'is_staff', 'citoyen_profile']
    
    def get_citoyen_profile(self, obj):
        try:
            profile = obj.citoyen_profile
            return {
                'isValid': profile.isValid,
                'address': profile.address,
                'dateOfBirth': profile.dateOfBirth
            }
        except:
            return None