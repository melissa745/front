from django.urls import path
from .views import EventoListCreate, EventoRetrieveUpdateDestroy

urlpatterns = [
    path('eventos/', EventoListCreate.as_view(), name='eventos-list-create'),
    path('eventos/<int:pk>/', EventoRetrieveUpdateDestroy.as_view(), name='eventos-detail'),
]