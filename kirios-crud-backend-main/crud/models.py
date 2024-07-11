from django.db import models

# Create your models here.
# Gestion de eventos

class Evento(models.Model):
    nombre = models.CharField(max_length=50)
    lugar = models.CharField(max_length=50)
    fecha = models.DateField()
    hora = models.TimeField()
    descripcion = models.TextField()
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre
    
