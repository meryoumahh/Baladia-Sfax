from django.urls import path
from .views import (
    ReclamationCreateView,
    ReclamationListView,
    ReclamationStatusUpdateView,
    ReclamationAssignAgentView,
    ReclamationListAgentView,
    ReclamationDeleteView,
    ReclamationUpdateView,
    get_user_stats
)

urlpatterns = [
    path('create/', ReclamationCreateView.as_view(), name='reclamation-create'),
    path('user-reclamations/', ReclamationListView.as_view(), name='user-reclamations-list'),
    path('status/<int:pk>/', ReclamationStatusUpdateView.as_view(), name='update-reclamation-status'),
    path('assignAgent/<int:pk>/', ReclamationAssignAgentView.as_view(), name='update-reclamation-agent'),
    #path('list/', ReclamationListView.as_view(), name='reclamation-list'),
    path('agent-reclamation-list/', ReclamationListAgentView.as_view(), name='reclamation-list-agent'),
    #path('create/', ReclamationCreateView.as_view(), name='reclamation-create'),
    path('update/<int:pk>/', ReclamationUpdateView.as_view(), name='reclamation-update'),
    path('delete/<int:pk>/', ReclamationDeleteView.as_view(), name='reclamation-delete'),
    path('stats/', get_user_stats, name='user-stats'),
    #path('agent-status/<int:pk>/', ReclamationAgentStatusUpdateView.as_view(), name='reclamation-agent-status-update'),

#path('<int:pk>/update/', ReclamationUpdateView.as_view(), name='reclamation-update'),
#path('<int:pk>/delete/', ReclamationDeleteView.as_view(), name='reclamation-delete'),
#path('<int:pk>/agent-status/', ReclamationAgentStatusUpdateView.as_view(), name='reclamation-agent-status-update'),
#path('assigned/', AgentListAssignedReclamations.as_view(), name='agent-reclamations-list'),
]
