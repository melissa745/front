from django.shortcuts import render
from rest_framework import generics
from .models import Evento
from .serializers import EventoSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class EventoListCreate(generics.ListCreateAPIView):
    queryset = Evento.objects.all().order_by('id')  # Ordenar por ID ascendente
    serializer_class = EventoSerializer

class EventoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

    def put(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    