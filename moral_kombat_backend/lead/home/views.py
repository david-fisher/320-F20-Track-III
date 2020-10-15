from django.shortcuts import render
from rest_framework import viewsets
from tables.models import demographics, students
from .serializer import DemographicsSerializer, StudentSerializer

# Create your views here.
class DemographicsView(viewsets.ModelViewSet):
    queryset = demographics.objects.all()
    serializer_class = DemographicsSerializer


class StudentsView(viewsets.ModelViewSet):
    queryset = demographics.objects.all()
    serializer_class = StudentSerializer