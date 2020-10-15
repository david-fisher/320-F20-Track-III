from rest_framework import serializers
from tables.models import demographics, students

class DemographicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = demographics
        fields = ('STUDENT_ID', 'AGE', 'GRADE', 'GENDER', 'RACE', 'MAJOR')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = students
        fields = ('STUDENT_ID', 'COURSE_ID')