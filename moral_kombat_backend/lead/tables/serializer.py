from rest_framework import serializers
from .models import *
# demographics, students, professors, scenarios, stakeholder_page, stakeholders, conversations

class DemographicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = demographics
        fields = ('STUDENT', 'AGE', 'GRADE', 'GENDER', 'RACE', 'MAJOR')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = students
        fields = ('STUDENT', 'NAME')

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = professors
        fields = ('PROFESSOR', 'NAME')


class ScenariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = scenarios
        fields = ('SCENARIO', 'VERSION', 'NAME', 'IS_FINISHED', 'PUBLIC', 'NUM_CONVERSATION', 'PROFESSOR')

class PagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = pages
        fields = ('PAGE', 'PAGE_TYPE', 'PAGE_TITLE', 'PAGE_BODY', 'SCENARIO', 'VERSION', 'NEXT_PAGE')

class Stakeholder_pageSerializer(serializers.ModelSerializer):
    class Meta:
        model = stakeholder_page
        fields = ('PAGE', 'STAKEHOLDER')

class Reflection_questionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = reflection_questions
        fields = ('PAGE', 'REFLECTION_QUESTION')


class StakeholdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = stakeholders
        fields = ('STAKEHOLDER', 'NAME', 'DESC', 'MATRIX', 'SCENARIO', 'VERSION')
    
class ConversationsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = conversations
        fields = ('STAKEHOLDER', 'QUESTION', 'RESPONSE')

class ReflectionsTakenSerializer(serializers.ModelSerializer):
    class Meta:
        model = reflections_taken
        fields = ('REFLECTIONS', 'STUDENT', 'COURSE', 'E', 'DATE')


class ConversationsHadSerializer(serializers.ModelSerializer):
    class Meta:
        model = conversations_had
        fields = ('STUDENT', 'COURSE', 'E', 'DATE',
                  'STAKEHOLDER', 'SCORE', 'QUESTION')


class StudentsInSerializer(serializers.ModelSerializer):
    class Meta:
        model = students_in
        fields = ('STUDENT', 'COURSE')


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = courses
        fields = ('COURSE', 'NAME')


class ResponsesSerializer(serializers.ModelSerializer):
    class Meta:
        model = responses
        fields = ('STUDENT', 'E', 'V', 'COURSE', 'DATE', 'CHOICE')


class allScenariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = scenarios
        fields = ('SCENARIO', 'NAME', 'IS_FINISHED', 'PROFESSOR')

class Scenarios_forSerializer(serializers.ModelSerializer):
    class Meta:
        model = scenarios_for
        fields = ('SCENARIO', 'COURSE', 'VERSION')

class Generic_pageSerializer(serializers.ModelSerializer):
    class Meta:
        model = generic_page
        fields = ('PAGE', 'BODY')

class Professors_teachSerializer(serializers.ModelSerializer):
    class Meta:
        model = professors_teach
        fields = ('PROFESSOR', 'COURSE')

class IssuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issues
        fields = ('SCENARIO', 'ISSUE', 'VERSION', 'NAME', 'IMPORTANCE_SCORE')

class LogisticsSerializer(serializers.ModelSerializer):
    logistics = Scenarios_forSerializer() 
    class Meta:
        model = scenarios
        fields = '__all__'
        """fields = ('SCENARIO', 
                'VERSION', 
                'NAME',  
                'IS_FINISHED',
                'PUBLIC',
                'NUM_CONVERSATION',
                'PROFESSOR', 
                )"""
