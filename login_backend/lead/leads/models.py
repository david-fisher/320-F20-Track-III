from django.db import models
from django import forms

# Create your models here.
class Lead(models.Model):
    netID = models.CharField(max_length = 100)
    password = models.CharField(max_length = 50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

# class UserForm(forms.ModelForm):
#     password = forms.CharField(widget = forms.PasswordInput)

#     class Meta:
#         model = User