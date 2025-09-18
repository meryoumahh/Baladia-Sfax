from django.urls import path 
from .views import UserInfoView , AgentCreateView, UserLoginView, UserLogoutView, CookieTokenRefreshView,CitoyenSignupView, UserSignupView, AgentListView,CitoyenListView, validate_citoyen
urlpatterns = [
    path ("user-info/", UserInfoView.as_view(), name="user-info"),
    path ("agent/signup/", AgentCreateView.as_view(), name="signup-agent"),
    path ("citoyen/signup/", CitoyenSignupView.as_view(), name="signup-citoyen"),
    path ("login/", UserLoginView.as_view(), name="login-user"),
    path ("logout/", UserLogoutView.as_view(), name="logout-user"),
    path ("common/signup/",UserSignupView.as_view() , name="signup-user"),
    #path("service-provider-profile/", ServiceProviderProfileView.as_view(), name="signup-service-provider"),
    #path("client-profile/", ClientProfileView.as_view(), name="signup-client"),
    path("listAgent/",  AgentListView.as_view(), name="list-agent"),
    path("listCitoyen/",  CitoyenListView.as_view(), name="list-citoyen"),
    path("validateCitoyen/<int:pk>/", validate_citoyen, name="validate-citoyen"),

    path ("refresh/", CookieTokenRefreshView.as_view(), name="token_refresh"),
]