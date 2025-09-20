from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView
from .serializers import CustomUserSerializer, AgentCreationSerializer, LoginSerializer, CitoyenSignupSerializer, AgentSerializer, CitoyenSerializer, UserInfoSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework import permissions
from .models import CustomUser, CitoyenProfile, AgentProfile
import json
from rest_framework import generics, permissions, status
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework.decorators import api_view, permission_classes
from django.db import transaction
from django.core.exceptions import ValidationError
import logging

logger = logging.getLogger(__name__)

# Create your views here.
class UserInfoView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserInfoSerializer
    
    def get_object(self):
        return self.request.user
    
    def patch(self, request, *args, **kwargs):
        """Update user profile with validation"""
        user = self.get_object()
        data = request.data
        
        try:
            with transaction.atomic():
                # Validate and update allowed fields
                if 'first_name' in data:
                    if not data['first_name'].strip():
                        return Response(
                            {'error': 'First name cannot be empty'}, 
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    user.first_name = data['first_name'].strip()
                    
                if 'last_name' in data:
                    if not data['last_name'].strip():
                        return Response(
                            {'error': 'Last name cannot be empty'}, 
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    user.last_name = data['last_name'].strip()
                    
                if 'telephone' in data:
                    telephone = data['telephone'].strip()
                    if not telephone.isdigit() or len(telephone) != 8:
                        return Response(
                            {'error': 'Telephone must be 8 digits'}, 
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    user.telephone = telephone
                
                user.full_clean()  # Validate model constraints
                user.save()
                
                serializer = self.get_serializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
                
        except ValidationError as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Profile update error for user {user.id}: {str(e)}")
            return Response(
                {'error': 'An unexpected error occurred'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
class UserSignupView(CreateAPIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]
    permission_classes = [AllowAny]
    
    

#
# class UserSignupView(APIView):
#    def post(self, request):
#        serializer = CustomUserSerializer(request.data)
#        if serializer.is_valid():
#            serializer.save()
#            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CitoyenSignupView(APIView):
    def post(self, request):


        data = request.data.copy()
        print("RAW request.data:", request.data)
        data = {key: value[0] if isinstance(value, list) else value for key, value in data.lists()}  # plain dict
        print("Processed data:", data)
        if "user" in data and isinstance(data["user"], str):
            try:
                data["user"] = json.loads(data["user"])
            except json.JSONDecodeError:
                return Response({"user": ["Invalid JSON format"]}, status=400)

        serializer = CitoyenSignupSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "citoyen created successfully"}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    queryset = CitoyenProfile.objects.all()
    serializer_class = CitoyenSignupSerializer
    permission_classes = [permissions.AllowAny]
    permission_classes = [AllowAny]


class AgentCreateView(APIView):
    def post(self, request):
        serializer = AgentCreationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Agent created successfully"}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    queryset = AgentProfile.objects.all()
    serializer_class = AgentCreationSerializer
    permission_classes = [permissions.AllowAny]
    permission_classes = [AllowAny]


class UserLoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']

            

            
            # Create new tokens
            refresh_token = RefreshToken.for_user(user)
            access_token = str(refresh_token.access_token)
            
            # Debug: Print token details
            import datetime
            print(f"Token created at: {datetime.datetime.now()}")
            print(f"Token expires at: {datetime.datetime.fromtimestamp(refresh_token.access_token['exp'])}")
            print(f"Current time: {datetime.datetime.now()}")
            response = Response(
                {
                    "user": CustomUserSerializer(user).data,
                    "access_token": access_token,
                    "refresh_token": str(refresh_token)
                },
                status=status.HTTP_200_OK
            )
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=False,
                samesite="Lax",
                max_age=7200,
                path="/")
            response.set_cookie(
                key="refresh_token",
                value=str(refresh_token),
                httponly=True,
                secure=False,
                samesite="Lax",
                max_age=7200,
                path="/")
            return response

        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#class UserLoginView(APIView):
##permission_classes = [AllowAny]
##authentication_classes = []
##def post(self, request):
###serializer = LoginSerializer(data=request.data)
###if serializer.is_valid():
####user = serializer.validated_data['user']

##### Create one refresh token only
####refresh = RefreshToken.for_user(user)
####access_token = str(refresh.access_token)

####response = Response(
#####{
######"user": CustomUserSerializer(user).data,
######"access_token": access_token,
######"refresh_token": str(refresh)
#####},
#####status=status.HTTP_200_OK
####)
####tokens = OutstandingToken.objects.filter(user=user)
####for token in tokens:
#####try:
######BlacklistedToken.objects.get_or_create(token=token)
#####except:
######pass  # token may already be blacklisted, ignore
####refresh = RefreshToken.for_user(user)
####access_token = str(refresh.access_token)
##### Set cookies (adjust secure/samesite depending on environment)
####response.set_cookie(
#####key="access_token",
#####value=access_token,
#####httponly=True,
#####secure=False,
#####samesite="None",
#####max_age=None)
####response.set_cookie(
#####key="refresh_token",
#####value=str(refresh),
#####httponly=True,
#####secure=False,
#####samesite="None",
#####max_age=None)
####return response

###return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:
                return Response({"error": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)

        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response

##def post(self, request):
###refresh_token = request.COOKIES.get("refresh_token")
###if refresh_token:
####try:
#####token = RefreshToken(refresh_token)
#####token.blacklist()
####except Exception:
#####return Response({"error": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)

###response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
###response.delete_cookie("access_token")
###response.delete_cookie("refresh_token")
###return response



class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return Response({"error": "Refresh token not provided"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            response = Response(
                {"access_token": access_token},
                status=status.HTTP_200_OK
            )
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=False,
                samesite="Lax",
            )
            return response
        except InvalidToken:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)


#class UserLoginView(APIView):
#    def post(self, request):
#        serializer = LoginSerializer(data=request.data)
#        if serializer.is_valid():
##user= serializer.validated_data['user']
##refresh_token = RefreshToken.for_user(user)
##access_token = str(refresh_token.access_token)
##tokens = OutstandingToken.objects.filter(user=user)
##for token in tokens:
##    try:
##        BlacklistedToken.objects.get_or_create(token=token)
##    except:
##        pass  # token may already be blacklisted, ignore

##refresh = RefreshToken.for_user(user)
##access_token = str(refresh.access_token)
##response = Response(
##    {
##        "user": CustomUserSerializer(user).data,
##        "access_token": access_token,    # return in response body
##        "refresh_token": str(refresh_token)
##    },
##    status=status.HTTP_200_OK
##)
#        
##response.set_cookie(key="access_token", 
####        value=access_token,
####        httponly=True,
####        secure=False,
####        samesite="None")
###
##response.set_cookie(key="refresh_token",
####        value=str(refresh_token),
####        httponly=True,
####        secure=False,
####        samesite="None") 

##return response
#        else:
##
##print(serializer.errors)
##return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#class UserLogoutView(APIView):
#    def post (self, request):
#        reftresh_token = request.COOKIES.get("refresh_token")
#        if reftresh_token :
##try:
##    refresh = RefreshToken(reftresh_token)
##    refresh.blacklist()  
##except Exception as e:
##    return Response({"error": "Invalid refresh token" + str(e)}, status=status.HTTP_400_BAD_REQUEST)     


#        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
#        response.delete_cookie("access_token")
#        response.delete_cookie("refresh_token")
#        return response  
#    


#class CookieTokenRefreshView(TokenRefreshView):
#    def post(self, request):
#        
#        refresh_token = request.COOKIES.get("refresh_token")
#        
#        if not refresh_token:
##return Response({"error":"Refresh token not provided"}, status= status.HTTP_401_UNAUTHORIZED)
#    
#        try:
##refresh = RefreshToken(refresh_token)
##access_token = str(refresh.access_token)
##
##response = Response({"message": "Access token token: "+refresh_token+ " refreshed successfully" + "\n" + "Access token  : " + access_token}, status=status.HTTP_200_OK)
##response.set_cookie(key="access_token", 
###        value=access_token,
###        httponly=True,
###        secure=False,
###        samesite="None")
##return response eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3Njg5NTkzLCJpYXQiOjE3NTc2ODIzOTMsImp0aSI6IjRmMzdhNjM1OWEwMjQyZmViMDRmOGJjYWIwMzcyODM5IiwidXNlcl9pZCI6IjcifQ.ucYLqPYIbPMkjC9Jw77aVffPBZkpaXnXXz2HIloFD74
#        except InvalidToken:
##return Response({"error":"Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
#        

class AgentListView(generics.ListAPIView):
    queryset = AgentProfile.objects.all()
    serializer_class = AgentSerializer
    permission_classes = [permissions.IsAdminUser]


class CitoyenListView(generics.ListAPIView):
    queryset = CitoyenProfile.objects.all()
    serializer_class = CitoyenSerializer
    permission_classes = [permissions.IsAdminUser]

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def validate_citoyen(request, pk):
    """Validate a citoyen profile - Admin only"""
    if not request.user.is_superuser:
        return Response(
            {'error': 'Permission denied. Admin access required.'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        # Validate pk is a valid integer
        if not str(pk).isdigit():
            return Response(
                {'error': 'Invalid citoyen ID format'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        citoyen = CitoyenProfile.objects.get(pk=pk)
        
        # Check if already validated
        if citoyen.isValid:
            return Response(
                {'message': 'Citoyen is already validated'}, 
                status=status.HTTP_200_OK
            )
            
        citoyen.isValid = True
        citoyen.save()
        
        return Response(
            {'message': 'Citoyen validated successfully'}, 
            status=status.HTTP_200_OK
        )
        
    except CitoyenProfile.DoesNotExist:
        return Response(
            {'error': 'Citoyen not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': 'An unexpected error occurred'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )