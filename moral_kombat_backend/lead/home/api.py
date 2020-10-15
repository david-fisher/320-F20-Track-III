from rest_framework import viewsets, permissions
from .serializer import 

class TablesViewSet(viewsets.ModelViewSet):
    queryset = Tables.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = HomeSerializer