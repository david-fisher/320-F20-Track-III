from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import *
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

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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

#this allows for filerting scenarios by professor_id
class allScenariosViewSet(generics.ListAPIView):
    serializer_class = allScenariosSerializer
    queryset = scenarios.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['PROFESSOR', 'IS_FINISHED']
    
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

class Action_pageViewSet(viewsets.ModelViewSet):
    queryset = action_page.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = Action_pageSerializer

#for getting/editing scenarios in dashboard
class logistics_page(APIView):
    #http_method_names = [ 'POST,' 'PUT', 'DELETE']

    def get(self, request, *args, **kwargs):
        
        #take professor_id as input from URL by adding ?professor_id=<the id #> to the end of the url.
        SCENARIO = self.request.query_params.get('scenario_id')
        #TODO check that id != none
        #get all scenarios belonging to this professor
        scenario = scenarios.objects.get(SCENARIO = SCENARIO)
        scenario_dict = ScenariosSerializer(scenario).data
        #loop through scenarios and append required information (course, page info)

        scenarios_for_query = scenarios_for.objects.filter(SCENARIO=scenario_dict['SCENARIO']).values()
        course_id_array = []
        for x in scenarios_for_query:
            print(x)
            course_id_array.append(x['COURSE_id'])

        course_dict_array = []
        for x in course_id_array:
            course = courses.objects.get(COURSE = x)
            course_dict_array.append({"COURSE":course.COURSE, "NAME": course.NAME})
                
        pages_query = pages.objects.filter(SCENARIO_id=scenario_dict['SCENARIO']).values()
        
        page_array = []
        for page in pages_query:
            cropped_page = {}
            cropped_page['PAGE'] = page['PAGE']
            cropped_page['PAGE_TITLE'] = page['PAGE_TITLE']
            page_array.append(cropped_page) 


        scenario_dict.update({
            "COURSES": course_dict_array,
            "PAGES": page_array
        })

        
        logistics = scenario_dict
        return Response(logistics)
    
    """format:
    {
        "SCENARIO": 1,
        "VERSION": 0,
        "NAME": "Pizza is Good!",
        "IS_FINISHED": false,
        "PUBLIC": false,
        "NUM_CONVERSATION": 5,
        "PROFESSOR": 12345678,
        "COURSES": 
        [
            {
                "COURSE": 2,
                "NAME": "590G"
            },
            {
                "COURSE": 1,
                "NAME": "320"
            }
        ]
    }
        """
    #a put request for editing scenarios. must provide scenario_id in url thusly: /logistics?scenario_id=<insert id number here>
    def put(self, request, *args, **kwargs):
        #save the scenario
        extant_scenario = scenarios.objects.get(SCENARIO = request.data['SCENARIO'])
        scenario_serializer = ScenariosSerializer(extant_scenario, data = request.data)
        if scenario_serializer.is_valid():
            scenario_serializer.save()

        #delete currently assocated classes
        scenarios_for.objects.filter(SCENARIO = request.data['SCENARIO']).delete()
        #get array of courses from frontend
        COURSES = request.data['COURSES']
        for course in COURSES:
            scenarios_for_dict = {
                "COURSE" : course['COURSE'],
                "SCENARIO" : request.data['SCENARIO'],
                "VERSION" : request.data['VERSION']
            }
            print(scenarios_for_dict)
        #save the classes associated with it in scenarios_for
            for_serializer = Scenarios_forSerializer(data=scenarios_for_dict)
            if for_serializer.is_valid():
                for_serializer.save()
                print('saved!')
            print(for_serializer.errors)
        scenario_dict = ScenariosSerializer(scenarios.objects.get(SCENARIO = request.data['SCENARIO'])).data
        scenario_dict['COURSES'] = request.data['COURSES']
        return Response(scenario_dict)

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
                    
            scenario["COURSES"] = course_dict_array
            logistics.append(scenario)
                
        return Response(logistics)

        """format:
        {
        "NAME": "Best Test",
        "IS_FINISHED": false,
        "PUBLIC": false,
        "NUM_CONVERSATION": 5,
        "PROFESSOR": 12345678,
        "COURSES":[
            {"COURSE": 1},
            {"COURSE": 2},
            {"COURSE": 3}
        ]
        }
        """

    def post(self, request, *args, **kwargs):
        #save the scenario
        scenario_serializer = ScenariosSerializer(data = request.data)
        if not (scenario_serializer.is_valid()):
            return Response(scenario_serializer.errors)
        scenario_serializer.save()
        scenario_dict = scenario_serializer.data
        
        #get array of courses from frontend
        COURSES = request.data['COURSES']
        for course in COURSES:
            scenarios_for_dict = {
                "COURSE" : course['COURSE'],
                "SCENARIO" : scenario_dict['SCENARIO'],
                "VERSION" : scenario_dict['VERSION']
            }

            for_serializer = Scenarios_forSerializer(data=scenarios_for_dict)
            if for_serializer.is_valid():
                for_serializer.save()

        scenario_dict = ScenariosSerializer(scenarios.objects.get(SCENARIO = scenario_dict['SCENARIO'])).data
        scenario_dict['COURSES'] = request.data['COURSES']
        return Response(scenario_dict)


                
            

#change a list of issue objects at URL /multi_issue?scenario_id=<insert id number here>
class multi_issue(APIView):
    def put(self, request, *args, **kwargs):
        SCENARIO = self.request.query_params.get('scenario_id')
        if SCENARIO == None:
            return Response({'status': 'details'}, status=status.HTTP_404_NOT_FOUND)
        for updated_issue in request.data:
            extant_issue = Issues.objects.get(SCENARIO = SCENARIO, ISSUE = updated_issue['ISSUE'])
            serializer = IssuesSerializer(extant_issue, data=updated_issue)
            if not serializer.is_valid(): 
                return Response(serializer.errors)
            try:
                serializer.save()
            except:
                print('something went wrong with the PUT')
        issues_query = Issues.objects.filter(SCENARIO = SCENARIO).values()
        return Response(issues_query)

#for use in the pages flowchart, input is an array of page objects
class flowchart(APIView):
    #get all page objects given a scenario id
    def get(self, request, *args, **kwargs):
        SCENARIO = self.request.query_params.get('scenario_id')
        pages_query = pages.objects.filter(SCENARIO=SCENARIO).values()
        for page in pages_query:
            if page['PAGE_TYPE'] == 'A':
                page['ACTION'] = action_page.objects.filter(PAGE=page['PAGE']).values()


        return Response(pages_query)

    #update the next_page field of all page objects
    def put(self, request, *args, **kwargs):
        SCENARIO = self.request.query_params.get('scenario_id')
        if SCENARIO == None:
            return Response({'status': 'details'}, status=status.HTTP_404_NOT_FOUND)
  
        for updated_page in request.data:
            #save updated choices within action pages  
            if updated_page['PAGE_TYPE'] == 'A':
                for updated_choice in updated_page['ACTION']:
                    extant_choice = action_page.objects.get(id=updated_choice['id']) 
                    action_serializer = Action_pageSerializer(extant_choice, updated_choice)
                    if not action_serializer.is_valid():
                        print("error with PUTing choices")
                        return Response(action_serializer.errors)
                    action_serializer.save()
            #save the page itself    
            extant_page = pages.objects.get(SCENARIO = SCENARIO, PAGE = updated_page['PAGE'])
            serializer = PagesSerializer(extant_page, data=updated_page)
            if not serializer.is_valid():
                print("error with PUTing pages")
                return Response(serializer.errors)
            serializer.save()
        #return query with newly saved pages     
        pages_query = pages.objects.filter(SCENARIO=SCENARIO).values()
        for page in pages_query:
            if page['PAGE_TYPE'] == 'A':
                page['ACTION'] = action_page.objects.filter(PAGE=page['PAGE']).values()
        return Response(pages_query)



# Pages viewset
class Page_reflectionViewSet(generics.CreateAPIView):
    model = pages
    serializer_class = Pages_reflectionSerializer

class Page_actionViewSet(generics.CreateAPIView):
    model = pages
    serializer_class = Pages_actionSerializer   

class Page_genericViewSet(generics.CreateAPIView):
    model = pages
    serializer_class = Pages_genericSerializer

class Page_StakeholderViewSet(generics.CreateAPIView):
    model = pages
    serializer_class = Pages_stakeholderSerializer
    


class pages_page(APIView):
    # Define get method for pages
    # @api_view(['GET'])
    def get(self, request, *args, **kwargs):

        # Takes the page_id from the URL if the url has ?page_id=<id> at the end, no parameter passed return error 400
        PAGE_ID = self.request.query_params.get('page_id')

        # Get all fields from this page_id if ti doesn't exist return error 404
        try:
            page = pages.objects.get(PAGE = PAGE_ID)
        except pages.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # Convers Django Model Object into a dictionary
        page_data = PagesSerializer(page).data
        
        page_type = page.PAGE_TYPE
        # Check page.PAGE_TYPE = 'REFLECTION'
        if (page_type == 'R'):
            reflection_query = reflection_questions.objects.filter(PAGE = PAGE_ID).values()
            page_data.update(
                {
                    "REFLECTION_QUESTIONS": reflection_query
                }
            )
            
            return Response(page_data, status=status.HTTP_200_OK)

        # Check page.PAGE_TYPE = 'ACTION'
        if (page_type == 'A'):
            action_query = action_page.objects.filter(PAGE = PAGE_ID).values()
            page_data.update(
                {
                    "CHOICES": action_query
                }
            )

            return Response(page_data, status=status.HTTP_200_OK)
        
        # Check page.PAGE_TYPE = 'GENERIC'
        if (page_type == 'G' or page_type == 'I'):
            generic_query = generic_page.objects.filter(PAGE = PAGE_ID).values()
            page_data.update(
                {
                    "BODIES":generic_query
                }
            )

            return Response(page_data, status=status.HTTP_200_OK)
        
        # Check page.PAGE_TYPE = 'STAKEHOLDER'
        if (page_type == 'S'):
            stakeholder_query = stakeholder_page.objects.filter(PAGE = PAGE_ID).values()
            page_data.update(
                {
                    "STAKEHOLDERS": stakeholder_query
                }
            )

            return Response(page_data, status=status.HTTP_200_OK)
        
        # Neither of these pages, something went wrong or missing implementation
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    
    # Define POST function for pages
    # @api_view(['POST'])
    def post(self, request):

        # Takes the scenario_id from the URL if the url has ?scenario_id=<id> at the end, no parameter passed return error 400

        page_type = request.data["PAGE_TYPE"]

        # If the request is a reflection page  
        if (page_type == 'R'):
            pages_serializer = PagesSerializer(data=request.data)
            if pages_serializer.is_valid():
                pages_serializer.save()
                page_id = pages_serializer.data["PAGE"]
                for question in request.data['REFLECTION_QUESTIONS']:
                    question['PAGE'] = page_id
                    nested_serializer = Reflection_questionsSerializer(data=question)
                    if  nested_serializer.is_valid():
                        nested_serializer.save()
                    # If the nested page is not valid it deletes the wrapper page created above
                    else:
                        page = pages.objects.get(PAGE=page_id)
                        page.delete()
                        return Response(nested_serializer.data, status=status.HTTP_400_BAD_REQUEST)
                    #nested_serializer.save()
                return Response(pages_serializer.data, status=status.HTTP_201_CREATED)
            
            # If the request was badly made or could not be created
            return Response(pages_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # If the request is an action page  
        if (page_type == 'A'):
            pages_serializer = PagesSerializer(data=request.data)
            if pages_serializer.is_valid():
                pages_serializer.save()
                page_id = pages_serializer.data["PAGE"]
                for choice in request.data['CHOICES']:
                    choice['PAGE'] = page_id
                    nested_serializer = Action_pageSerializer(data=choice)
                    if  nested_serializer.is_valid():
                        nested_serializer.save()
                    # If the nested page is not valid it deletes the wrapper page created above
                    else:
                        page = pages.objects.get(PAGE=page_id)
                        page.delete()
                        return Response(nested_serializer.data, status=status.HTTP_400_BAD_REQUEST)
                    #nested_serializer.save()
                return Response(pages_serializer.data, status=status.HTTP_201_CREATED)
            
            # If the request was badly made or could not be created
            return Response(pages_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        # If the request is a generic page  
        if (page_type == 'G' or page_type == 'I'):
            pages_serializer = PagesSerializer(data=request.data)
            if pages_serializer.is_valid():
                pages_serializer.save()
                page_id = pages_serializer.data["PAGE"]
                for body in request.data['BODIES']:
                    body['PAGE'] = page_id
                    nested_serializer = Generic_pageSerializer(data=body)
                    if  nested_serializer.is_valid():
                        nested_serializer.save()
                    # If the nested page is not valid it deletes the wrapper page created above
                    else:
                        page = pages.objects.get(PAGE=page_id)
                        page.delete()
                        return Response(nested_serializer.data, status=status.HTTP_400_BAD_REQUEST)
                    #nested_serializer.save()
                return Response(pages_serializer.data, status=status.HTTP_201_CREATED)
            
            # If the request was badly made or could not be created
            return Response(pages_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # If the request is a stakeholder page 
        if (page_type == 'S'):
            pages_serializer = PagesSerializer(data=request.data)
            if pages_serializer.is_valid():
                pages_serializer.save()
                page_id = pages_serializer.data["PAGE"]
                for stakeholder in request.data['STAKEHOLDERS']:
                    stakeholder['PAGE'] = page_id
                    nested_serializer = Stakeholder_pageSerializer(data=stakeholder)
                    if  nested_serializer.is_valid():
                        nested_serializer.save()
                    # If the nested page is not valid it deletes the wrapper page created above
                    else:
                        page = pages.objects.get(PAGE=page_id)
                        page.delete()
                        return Response(nested_serializer.data, status=status.HTTP_400_BAD_REQUEST)
                    #nested_serializer.save() #DELETE
                return Response(pages_serializer.data, status=status.HTTP_201_CREATED)

            # If the request was badly made or could not be created
            return Response(pages_serializer.data, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST) 

    # @api_view(['PUT'])
    def put(self, request):

        # Takes the page_id from the URL if the url has ?page_id=<id> at the end, no parameter passed return error 400
        PAGE_ID = self.request.query_params.get('page_id')

        # Get all fields from this page_id if it doesn't exist return error 404
        try:
            page = pages.objects.get(PAGE = PAGE_ID)
        except pages.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # PLEASE DON'T MODIFY THE SCENARIO
        request.data["SCENARIO"] = PagesSerializer(page).data['SCENARIO']

        if request.method == "PUT": 
        
            page_type = page.PAGE_TYPE

            # Check page.PAGE_TYPE = 'REFLECTION'
            if (page_type == 'R'):
                pages_serializer = PagesSerializer(page, data=request.data)
                if pages_serializer.is_valid():
                    pages_serializer.save()
                    
                    # Check that each reflectuon question already exists
                    for question in request.data['REFLECTION_QUESTIONS']:
                        try:
                            reflection_page = reflection_questions.objects.get(id = question.get('id'))
                        except:
                            # If the subpage DOES NOT EXIST, then you create that new page and post it and continue to the next component
                            question['PAGE'] = PAGE_ID
                            nested_serializer = Reflection_questionsSerializer(data=question)
                            if nested_serializer.is_valid():
                                nested_serializer.save()
                            else:
                                return Response(nested_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                            continue

                        question['PAGE'] = PAGE_ID
                        nested_serializer = Reflection_questionsSerializer(reflection_page, data=question)
                        if nested_serializer.is_valid():
                            nested_serializer.save()
                        else:
                            return Response(nested_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    return Response(pages_serializer.data, status=status.HTTP_200_OK)
                # Else the request was badly made
                return Response(pages_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            # Check page.PAGE_TYPE = 'ACTION'
            if (page_type == 'A'):
                pages_serializer = PagesSerializer(page, data=request.data)
                if pages_serializer.is_valid():
                    pages_serializer.save()
                    
                    # Check that each Action_Page already exists
                    for action in request.data['CHOICES']:
                        try:
                            choices_page = action_page.objects.get(id = action.get('id'))
                        except:
                            # If the subpage DOES NOT EXIST, then you create that new page and post it and continue to the next component
                            action['PAGE'] = PAGE_ID
                            nested_serializer = Action_pageSerializer(data=action)
                            if nested_serializer.is_valid():
                                nested_serializer.save()
                            else:
                                return Response(nested_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                            continue

                        action['PAGE'] = PAGE_ID
                        nested_serializer = Action_pageSerializer(choices_page, data=action)
                        if nested_serializer.is_valid():
                            nested_serializer.save()
                        else:
                            return Response(nested_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    return Response(pages_serializer.data, status=status.HTTP_200_OK)
                # Else the request was badly made
                return Response(pages_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            # Check page.PAGE_TYPE = 'GENERIC'
            if (page_type == 'G' or page_type == 'I'):
                pages_serializer = PagesSerializer(page, data=request.data)
                if pages_serializer.is_valid():
                    pages_serializer.save()
                    
                    # Check that each Generic Page already exists
                    for body in request.data['BODIES']:
                        try:
                            body_page = generic_page.objects.get(id = body.get('id'))
                        except:
                            # If the subpage DOES NOT EXIST, then you create that new page and post it and continue to the next component
                            body['PAGE'] = PAGE_ID
                            nested_serializer = Generic_pageSerializer(data=body)
                            if nested_serializer.is_valid():
                                nested_serializer.save()
                            else:
                                return Response(nested_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                            continue

                        body['PAGE'] = PAGE_ID
                        nested_serializer = Generic_pageSerializer(body_page, data=body)
                        if nested_serializer.is_valid():
                            nested_serializer.save()
                        else:
                            return Response(nested_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    return Response(pages_serializer.data, status=status.HTTP_200_OK)
                # Else the request was badly made
                return Response(pages_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Check page.PAGE_TYPE = 'STAKEHOLDERS'
            if (page_type == 'S'):
                pages_serializer = PagesSerializer(page, data=request.data)
                if pages_serializer.is_valid():
                    pages_serializer.save()
                    
                    # Check that each Stakeholder page already exists
                    for stakeholder in request.data['STAKEHOLDERS']:
                        try:
                            page_stakeholder = stakeholder_page.objects.get(id = stakeholder.get('id'))
                        except:
                            # If the subpage DOES NOT EXIST, then you create that new page and post it and continue to the next component
                            stakeholder['PAGE'] = PAGE_ID
                            nested_serializer = Stakeholder_pageSerializer(data=stakeholder)
                            if nested_serializer.is_valid():
                                nested_serializer.save()
                            else:
                                return Response(nested_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                            continue

                        stakeholder['PAGE'] = PAGE_ID
                        nested_serializer = Stakeholder_pageSerializer(page_stakeholder, data=stakeholder)
                        if nested_serializer.is_valid():
                            nested_serializer.save()
                        else:
                            return Response(nested_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    return Response(pages_serializer.data, status=status.HTTP_200_OK)
                # Else the request was badly made
                return Response(pages_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            # Not a valid type of page
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST) 


    # @api_view(['DELETE'])
    def delete(self, request):

        # Takes the page_id from the URL if the url has ?page_id=<id> at the end, no parameter passed return error 400
        PAGE_ID = self.request.query_params.get('page_id')

        # Check if the page exists.
        try: 
            page = pages.objects.get(PAGE=PAGE_ID)
        except pages.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        
        # Delete the page
        if (request.method == "DELETE"):
            #set next page field of pages pointing to the deleted page to be None/Null
            next_pages = pages.objects.filter(NEXT_PAGE = PAGE_ID)
            for updated_page in next_pages:
                extant_page = updated_page
                updated_page.NEXT_PAGE = None
                updated_page_dict = PagesSerializer(updated_page).data
                pages_serializer = PagesSerializer(extant_page, data=updated_page_dict)
                if pages_serializer.is_valid():
                    pages_serializer.save()
                else:
                    print("error in making next_page = null during delete!")
                    return Response(pages_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            #also set and result_page fields pointing to the deleted page to be null as well.
            action_pages = action_page.objects.filter(RESULT_PAGE = PAGE_ID)
            for updated_page in action_pages:
                extant_page = updated_page
                updated_page.RESULT_PAGE = None
                updated_page_dict = Action_pageSerializer(updated_page).data
                action_pages_serializer = Action_pageSerializer(extant_page, data=updated_page_dict)
                if action_pages_serializer.is_valid():
                    action_pages_serializer.save()
                else:
                    print("error in making next_page = null during delete!")
                    return Response(action_pages_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Finally delete the page 
            operation = page.delete()
            page_data = {}
            if (operation):
                page_data["success"] = "delete successful"
            else:
                page_data["failure"] = "delete failed"
            
            return Response(data=page_data)
