from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from tables.models import *
from .serializer import *
from django.core import serializers
from django.db.models import F
import json
# DemographicsSerializer, StudentSerializer, ProfessorSerializer, ScenariosSerializer, allScenariosSerializer, Choices_forSerializer, Stakeholder_pageSerializer, StakeholdersSerializer, ConversationsSerializer, Stakeholder_inSerializer

class DemographicsViewSet(viewsets.ModelViewSet):
    queryset = demographics.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DemographicsSerializer

class StudentsViewSet(viewsets.ModelViewSet):
    queryset = students.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StudentSerializer

class ProfessorsViewSet(viewsets.ModelViewSet):
    queryset = professors.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProfessorSerializer


class ScenariosViewSet(viewsets.ModelViewSet):
    queryset = scenarios.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = ScenariosSerializer

class SingleScenarioViewSet(viewsets.ModelViewSet):
    def get(self, request):
        scenario = scenarios.objects.all()
        serializer = ScenariosSerializer(scenarios)
        return Response(serializer.data)



class PagesViewSet(viewsets.ModelViewSet):
    queryset = pages.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = PagesSerializer

# Choices_For ViewSet
class Choices_forViewSet(viewsets.ModelViewSet):
    queryset = choices_for.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = Choices_forSerializer

# Stakeholder_page Viewset
class Stakeholder_pageViewSet(viewsets.ModelViewSet):
    queryset = stakeholder_page.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = Stakeholder_pageSerializer


class Reflection_QuestionsViewSet(viewsets.ModelViewSet):
    queryset = reflection_questions.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = Reflection_questionsSerializer

# Stakeholders ViewSet
class StakeholdersViewSet(viewsets.ModelViewSet):
    queryset = stakeholders.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = StakeholdersSerializer

# Conversations ViewSet
class ConversationsViewSet(viewsets.ModelViewSet):
    queryset = conversations.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = ConversationsSerializer

# Stakeholders_in ViewSet
class Stakeholder_inViewSet(viewsets.ModelViewSet):
    queryset = stakeholder_in.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = Stakeholder_inSerializer

class ReflectionsTakenViewSet(viewsets.ModelViewSet):
    queryset = reflections_taken.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = ReflectionsTakenSerializer


class ConversationsHadViewSet(viewsets.ModelViewSet):
    queryset = conversations_had.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = ConversationsHadSerializer


class StudentsInViewSet(viewsets.ModelViewSet):
    queryset = students_in.objects.all()
    permission_class = [permissions.AllowAny]
    serializer_class = StudentsInSerializer


class CoursesViewSet(viewsets.ModelViewSet):
    queryset = courses.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CoursesSerializer


class ResponsesViewSet(viewsets.ModelViewSet):
    queryset = responses.objects.all()
    permission_classe = [permissions.AllowAny]
    serializer_class = ResponsesSerializer

#this allows for filerting scenarios by professor_ID
class allScenariosViewSet(generics.ListAPIView):
    serializer_class = allScenariosSerializer
    queryset = scenarios.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['PROFESSOR_ID', 'IS_FINISHED']
    
# Scenarios_for ViewSet
class Scenarios_forViewSet(viewsets.ModelViewSet):
    queryset = scenarios_for.objects.all()
    permissions_class = [
        permissions.AllowAny
    ]
    serializer_class = Scenarios_forSerializer

# generic_page ViewSet
class generic_pageViewSet(viewsets.ModelViewSet):
    queryset = generic_page.objects.all()
    permissions_class = [
        permissions.AllowAny
    ]
    serializer_class = Generic_pageSerializer

# Professors_teach ViewSet
class Professors_teachViewSet(viewsets.ModelViewSet):
    queryset = professors_teach.objects.all()
    permissions_class = [
        permissions.AllowAny
    ]
    serializer_class = Professors_teachSerializer

"""
    -Get Scenario(all fields) ---------------
	-Get course name associated with scenario
	-Get Professor (creators) names associated with scenario
	-get page_ID and title for latest version of each page
"""

class logistics_page(APIView):
    #http_method_names = [ 'POST,' 'PUT', 'DELETE']

    def get(self, request, *args, **kwargs):
        
        #take professor_id as input from URL by adding ?professor_id=<the id #> to the end of the url.
        SCENARIO_ID = self.request.query_params.get('scenario_id')
        #TODO check that id != none
        #get all scenarios belonging to this professor
        scenario = scenarios.objects.get(SCENARIO_ID = SCENARIO_ID)
        scenario_dict = ScenariosSerializer(scenario).data
        #loop through scenarios and append required information (course, page info)

        scenarios_for_query = scenarios_for.objects.filter(SCENARIO_ID=scenario_dict['SCENARIO_ID']).values()
        course_id_array = []
        for x in scenarios_for_query:
            print(x)
            course_id_array.append(x['COURSE_ID_id'])

        course_dict = {}
        for x in course_id_array:
            course = courses.objects.get(COURSE_ID = x)
            course_dict.update({"COURSE_ID":course.COURSE_ID, "NAME": course.NAME})
                
        pages_query = pages.objects.filter(SCENARIO_id=scenario_dict['SCENARIO_ID']).values()


        scenario_dict.update({
            "COURSE": course_dict,
            "PAGES": pages_query
        })

        
        logistics = scenario_dict
        return Response(logistics)

    #a put request for editing scenarios. must provide scenario_id in url thusly: /logistics?scenario_id=<insert id number here>
    def put(self, request, *args, **kwargs):
        SCENARIO_ID = self.request.query_params.get('scenario_id')
        extant_scenario  = scenarios.objects.get(SCENARIO_ID=SCENARIO_ID)
        updated_scenario = request.data
        serializer = ScenariosSerializer(extant_scenario, data=updated_scenario)
        if serializer.is_valid(): 
            serializer.save() 
            return Response(serializer.data) 
        return Response(serializer.errors)




        """logistics = {}
        for senarios in senarios.objects.all:
            logistics[]"""
        #scenario_list = serializers.serialize('json', scenario_query)
        #logistics = serializers.serialize('json', self.get_queryset())
        #logistics = scenarios.objects.get(SCENARIO_ID = 12)
        #logistics = [scenarios.SCENARIO_ID for scenarios in scenarios.objects.all()]
        #logistics = scenarios.objects.filter(PROFESSOR_ID=PROFESSOR_ID)
        #logistics = scenarios.objects.raw('SELECT * FROM "public"."tables_scenarios" INNER JOIN "public"."tables_scenarios_for" ON "public"."tables_scenarios"."SCENARIO_ID" = "public"."tables_scenarios_for"."SCENARIO_ID_id"')

        #logistics = serializers.serialize('json', scenarios.objects.all())
        #logistics = logistics.get(SCENARIO_ID = 12)
        
        #logistics = LogisticsSerializer(logistics.values())

        """logistics.append({"SCENARIO_ID": scenario.SCENARIO_ID,
                             "VERSION_ID": scenario.VERSION_ID,
                             "NAME": scenario.NAME,
                             "SUB_TITLE": scenario.SUB_TITLE,
                             "IS_FINISHED": scenario.IS_FINISHED,
                             "PUBLIC": scenario.PUBLIC,
                             "NUM_CONVERSATIONS": scenario.NUM_CONVERSATIONS,
                             "PROFESSOR_ID": scenario.PROFESSOR_ID,
                             "FIRST_PAGE": scenario.FIRST_PAGE
                            })"""