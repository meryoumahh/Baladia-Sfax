from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed


class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get("access_token")
        print(f"DEBUG: Cookies received: {request.COOKIES}")
        print(f"DEBUG: access_token cookie: {token}")
        if not token:
            print("DEBUG: No access_token cookie found")
            return None
        try:
            validated_token = self.get_validated_token(token)
            user = self.get_user(validated_token)
            print(f"DEBUG: Authentication successful for user: {user}")
            return user, validated_token
        except Exception as e:
            print(f"Auth failed: {e}")  # Debug
            return None
            
            
       
    