from django.urls import path
from .views import (
    ReclamationCreateView,
    UserReclamationListView
)

urlpatterns = [
    path('create/', ReclamationCreateView.as_view(), name='reclamation-create'),
    path('user-reclamations/', UserReclamationListView.as_view(), name='user-reclamations-list'),
#path('<int:pk>/update/', ReclamationUpdateView.as_view(), name='reclamation-update'),
#path('<int:pk>/delete/', ReclamationDeleteView.as_view(), name='reclamation-delete'),
#path('<int:pk>/agent-status/', ReclamationAgentStatusUpdateView.as_view(), name='reclamation-agent-status-update'),
#path('assigned/', AgentListAssignedReclamations.as_view(), name='agent-reclamations-list'),
]
