from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView
from .serializers import CustomUserSerializer, AgentSignupSerializer, LoginSerializer, CitoyenSignupSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework import permissions
from .models import CustomUser, CitoyenProfile, AgentProfile
# Create your views here.
class UserInfoView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer
    def get_object(self):
        return self.request.user
    
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
        serializer = CitoyenSignupSerializer(data=request.data)
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


class AgentSignupView(APIView):
    def post(self, request):
        serializer = AgentSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Agent created successfully"}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    queryset = AgentProfile.objects.all()
    serializer_class = AgentSignupSerializer
    permission_classes = [permissions.AllowAny]
    permission_classes = [AllowAny]




class UserLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user= serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            response = Response({
                "user": CustomUserSerializer(user).data},
                                status=status.HTTP_200_OK)
        
            response.set_cookie(key="access_token", 
                                            value=access_token,
                                            httponly=True,
                                            secure=False,
                                            samesite="None")
                        
            response.set_cookie(key="refresh_token",
                                            value=str(refresh),
                                            httponly=True,
                                            secure=False,
                                            samesite="None") 

            return response
        else:
            
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    def post (self, request):
        reftresh_token = request.COOKIES.get("refresh_token")
        if reftresh_token :
            try:
                refresh = RefreshToken(reftresh_token)
                refresh.blacklist()  
            except Exception as e:
                return Response({"error": "Invalid refresh token" + str(e)}, status=status.HTTP_400_BAD_REQUEST)     


        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response  
    


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request):
        
        refresh_token = request.COOKIES.get("refresh_token")
        
        if not refresh_token:
            return Response({"error":"Refresh token not provided"}, status= status.HTTP_401_UNAUTHORIZED)
    
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            
            response = Response({"message": "Access token token refreshed successfully"}, status=status.HTTP_200_OK)
            response.set_cookie(key="access_token", 
                                value=access_token,
                                httponly=True,
                                secure=True,
                                samesite="None")
            return response
        except InvalidToken:
            return Response({"error":"Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
        