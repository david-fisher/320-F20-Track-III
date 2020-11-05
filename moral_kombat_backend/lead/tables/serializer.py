from rest_framework import serializers
from .models import *
# demographics, students, professors, scenarios, choices_for, stakeholder_page, stakeholders, conversations, stakeholder_in

class DemographicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = demographics
        fields = ('STUDENT_ID', 'AGE', 'GRADE', 'GENDER', 'RACE', 'MAJOR')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = students
        fields = ('STUDENT_ID', 'NAME')

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = professors
        fields = ('PROFESSOR_ID', 'NAME')


class ScenariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = scenarios
        fields = ('SCENARIO_ID', 'VERSION_ID', 'NAME', 'SUB_TITLE', 'IS_FINISHED', 'PUBLIC', 'NUM_CONVERSATIONS', 'PROFESSOR_ID', 'FIRST_PAGE')

class Choices_forSerializer(serializers.ModelSerializer):
    class Meta:
        model = choices_for
        fields = ('SCENARIO_ID', 'VERSION_ID', 'CHOICES')

class PagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = pages
        fields = ('PAGE_ID', 'PAGE_TYPE', 'PAGE_TITLE', 'PAGE_BODY', 'SCENARIO', 'VERSION_ID', 'NEXT_PAGE_ID')

class Stakeholder_pageSerializer(serializers.ModelSerializer):
    class Meta:
        model = stakeholder_page
        fields = ('PAGE_ID', 'STAKEHOLDER')

class Reflection_questionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = reflection_questions
        fields = ('PAGE_ID', 'REFLECTION_QUESTION')


class StakeholdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = stakeholders
        fields = ('STAKEHOLDER_ID', 'NAME', 'DESC', 'MATRIX', 'SCENARIO_ID', 'VERSION_ID')
    
class ConversationsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = conversations
        fields = ('STAKEHOLDER_ID', 'QUESTION', 'RESPONSE')

class Stakeholder_inSerializer(serializers.ModelSerializer):
    class Meta:
        model = stakeholder_in
        fields = ('STAKEHOLDER_ID', 'SCENARIO_ID', 'VERSION_ID')

class ReflectionsTakenSerializer(serializers.ModelSerializer):
    class Meta:
        model = reflections_taken
        fields = ('REFLECTIONS', 'STUDENT_ID', 'COURSE_ID', 'E_ID', 'DATE')


class ConversationsHadSerializer(serializers.ModelSerializer):
    class Meta:
        model = conversations_had
        fields = ('STUDENT_ID', 'COURSE_ID', 'E_ID', 'DATE',
                  'STAKEHOLDER_ID', 'SCORE', 'QUESTION')


class StudentsInSerializer(serializers.ModelSerializer):
    class Meta:
        model = students_in
        fields = ('STUDENT_ID', 'COURSE_ID')


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = courses
        fields = ('COURSE_ID', 'NAME')


class ResponsesSerializer(serializers.ModelSerializer):
    class Meta:
        model = responses
        fields = ('STUDENT_ID', 'E_ID', 'V_ID', 'COURSE_ID', 'DATE', 'CHOICE')


class allScenariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = scenarios
        fields = ('SCENARIO_ID', 'NAME', 'SUB_TITLE', 'IS_FINISHED', 'CREATOR')

class Scenarios_forSerializer(serializers.ModelSerializer):
    class Meta:
        model = scenarios_for
        fields = ('SCENARIO_ID', 'COURSE_ID', 'VERSION_ID')

class Generic_pageSerializer(serializers.ModelSerializer):
    class Meta:
        model = generic_page
        fields = ('PAGE_ID', 'BODY')

class Professors_teachSerializer(serializers.ModelSerializer):
    class Meta:
        model = professors_teach
        fields = ('PROFESSOR_ID', 'COURSE_ID')

class LogisticsSerializer(serializers.ModelSerializer):
    logistics = Scenarios_forSerializer() 
    class Meta:
        model = scenarios
        fields = '__all__'
        """fields = ('SCENARIO_ID', 
                'VERSION_ID', 
                'NAME',  
                'IS_FINISHED',
                'PUBLIC',
                'NUM_CONVERSATIONS',
                'PROFESSOR_ID', 
                'FIRST_PAGE',
                )"""
