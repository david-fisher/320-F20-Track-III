from django.db import models
from django import forms

# Create your models here.
class Home(models.Model):
    scenario_name = models.CharField(max_length = 500)
    introduction_info = models.CharField(max_length = 500)
    initialq1 = models.CharField(max_length = 500)
    initialq2 = models.CharField(max_length = 500)
    initialac1 = models.CharField(max_length = 500)
    initialac2 = models.CharField(max_length = 500)
    stakeholderconv1 = models.CharField(max_length = 500)
    stakeholderconv2 = models.CharField(max_length = 500)
    stakeholderconv3 = models.CharField(max_length = 500)
    stakeholderconv4 = models.CharField(max_length = 500)
    stakeholderconv5 = models.CharField(max_length = 500)
    stakeholderconv6 = models.CharField(max_length = 500)
    middleq1 = models.CharField(max_length = 500)
    middleq2 = models.CharField(max_length = 500)
    finalac1 = models.CharField(max_length = 500)
    finalac2 = models.CharField(max_length = 500)
    consequences = models.CharField(max_length = 500)
    finalq1 = models.CharField(max_length = 500)
    finalq2 = models.CharField(max_length = 500)
    conclusion = models.CharField(max_length = 500)
    conclusion = models.CharField(max_length = 500)