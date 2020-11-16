from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from tables.models import *
from .serializer import *
from django.core import serializers
from rest_framework import status  
import json
# DemographicsSerializer, StudentSerializer, ProfessorSerializer, ScenariosSerializer, allScenariosSerializer, Stakeholder_pageSerializer, StakeholdersSerializer, ConversationsSerializer

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

class IssuesViewSet(viewsets.ModelViewSet):
    queryset = Issues.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = IssuesSerializer

#for getting/editing scenarios in dashboard
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
        
        page_array = []
        for page in pages_query:
            cropped_page = {}
            cropped_page['PAGE'] = page['PAGE_ID']
            cropped_page['PAGE_TITLE'] = page['PAGE_TITLE']
            page_array.append(cropped_page) 


        scenario_dict.update({
            "COURSE": course_dict,
            "PAGES": page_array
        })

        
        logistics = scenario_dict
        return Response(logistics)

    #a put request for editing scenarios. must provide scenario_id in url thusly: /logistics?scenario_id=<insert id number here>
    def put(self, request, *args, **kwargs):
        SCENARIO = self.request.query_params.get('scenario_id')
        extant_scenario  = scenarios.objects.get(SCENARIO_ID=SCENARIO_ID)
        updated_scenario = request.data
        serializer = ScenariosSerializer(extant_scenario, data=updated_scenario)
        if serializer.is_valid(): 
            serializer.save()
            version = serializer.data['VERSION_ID']
            scenarios_for_dict = ScenariosSerializer(request.data).data
            scenario_for_dict.update({'SCENARIO_ID': SCENARIO_ID})
            scenario_for_dict.update({'VERSION_ID': version})
            print(scenarios_for_dict)
            serializer2 = scenario_for_serializer(data=scenario_for_dict)
            if serializer2.is_valid():
                serializer2.save()
                return Response(serializer2.data) 
        return Response(serializer2.errors)

#returns list of scenarios for given professor along with list of associated courses
class dashboard_page(APIView):
    def get(self, request, *args, **kwargs):
        
        #take professor_id as input from URL by adding ?professor_id=<the id #> to the end of the url.
        PROFESSOR = self.request.query_params.get('professor_id')
        #TODO check that id != none
        #get all scenarios belonging to this professor
        scenario_query = scenarios.objects.filter(PROFESSOR = PROFESSOR).values()
        #loop through scenarios and append required information (course, page info)
        logistics = []
        for scenario in scenario_query:
            scenarios_for_query = scenarios_for.objects.filter(SCENARIO = scenario['SCENARIO']).values()
            course_id_array = []
            for x in scenarios_for_query:
                course_id_array.append(x['COURSE_id'])

            course_dict_array = []
            for x in course_id_array:
                course = courses.objects.get(COURSE= x)
                course_dict = {"COURSE":course.COURSE, "NAME": course.NAME}
                course_dict_array.append(course_dict)
                    
            scenario["ASSOCIATED_COURSES"] = course_dict_array
            logistics.append(scenario)
                
        return Response(logistics)

        """format:
        {
        "NAME": "",
        "IS_FINISHED": false,
        "PUBLIC": false,
        "NUM_CONVERSATION": null,
        "PROFESSOR": null
        "COURSES":[
            COURSE: 1
            NAME: "325"
        ]
        }"""

        def post(self, request, *args, **kwargs):
            #save the scenario
            scenario_serializer = ScenariosSerializer(data = request.data)
            if scenario_serializer.is_valid():
                scenario_serializer.save();
            
            #get array of courses from frontend
            COURSES = request.data['COURSES']
            for course in COURSES:
                scenarios_for_dict = {
                    "COURSE": course['COURSE']
                    "SCENARIO": request.data['SCENARIO'],
                    "VERSION": request.data['VERSION']
                }
                
                
            

#change a list of issue objects at URL /multi_issue?scenario_id=<insert id number here>
class multi_issue(APIView):
    def put(self, request, *args, **kwargs):
        SCENARIO = self.request.query_params.get('scenario_id')
        if SCENARIO == None:
            return Response({'status': 'details'}, status=status.HTTP_404_NOT_FOUND)
        for updated_issue in request.data:
            extant_issue = Issues.objects.get(SCENARIO = SCENARIO, ISSUE = updated_issue['ISSUE'])
            serializer = IssuesSerializer(extant_issue, data=updated_issue)
            if serializer.is_valid(): 
                serializer.save()
        issues_query = Issues.objects.filter(SCENARIO = SCENARIO).values()
        return Response(issues_query)




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