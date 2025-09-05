from django.urls import path 
from .views import UserInfoView , ServiceProviderSignupView, UserLoginView, UserLogoutView, CookieTokenRefreshView,ClientSignupView, UserSignupView
urlpatterns = [
    path ("user-info/", UserInfoView.as_view(), name="user-info"),
    path ("service-provider/signup/", ServiceProviderSignupView.as_view(), name="signup-service-provider"),
    path ("client/signup/", ClientSignupView.as_view(), name="signup-client"),
    path ("login/", UserLoginView.as_view(), name="login-user"),
    path ("logout/", UserLogoutView.as_view(), name="logout-user"),
    path ("common/signup/",UserSignupView.as_view() , name="signup-user"),
    #path("service-provider-profile/", ServiceProviderProfileView.as_view(), name="signup-service-provider"),
    #path("client-profile/", ClientProfileView.as_view(), name="signup-client"),
    path ("refresh/", CookieTokenRefreshView.as_view(), name="token_refresh"),
]