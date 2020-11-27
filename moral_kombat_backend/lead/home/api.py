from home.models import Home
from rest_framework import viewsets, permissions
from .serializer import HomeSerializer

class HomeViewSet(viewsets.ModelViewSet):
    queryset = Home.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = HomeSerializer