from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import action
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins
from rest_framework.decorators import api_view
from tables.models import *
from .serializer import *
from django.db import connection
from rest_framework.parsers import JSONParser


# Stakeholders ViewSet
class StakeholdersViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = stakeholders.objects.all()
        return queryset
    queryset = stakeholders.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = StakeholdersSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['SCENARIO']
    lookup_field = "STAKEHOLDER"



    # @action(detail=True, methods=["GET"])
    # def convos(self, request, **kwargs):
    #     STAKEHOLDER_ID = self.get_object()
    #     convos = conversations.objects.filter(STAKEHOLDER_ID=STAKEHOLDER_ID)
    #     serializer = ConversationsSerializer(convos, many=True)
    #     return Response(serializer.data, status=200)


    # def create(self, request, *args, **kwargs):
    #     # conver = self.get_object()
    #     postdata = request.data
    #     print(postdata)

    #     sql_query = """INSERT INTO "public"."tables_stakeholders" ("NAME", "DESC", "MAIN_CONVERSATION", "SCENARIO_ID_id", "VERSION_ID_id") 
    #                     VALUES (%s, %s, %s, %s, %s) RETURNING "STAKEHOLDER_ID"
    #                 """

    #     cursor = connection.cursor()

    #     cursor.execute(sql_query, (postdata['NAME'], postdata['DESC'], postdata['MAIN_CONVERSATION'], postdata['SCENARIO_ID'], postdata['VERSION_ID']))
        
    #     lastStakeholder_id = cursor.fetchone()[0]

    #     for item in postdata["CONVERSATION"]:
    #         query2 = """INSERT INTO "public"."tables_conversations" 
    #                 ("STAKEHOLDER_ID_id", "QUESTION", "RESPONSE") VALUES (%s, %s, %s)"""
    #         cursor.execute(query2, (lastStakeholder_id, item["QUESTION"], item["RESPONSE"]))
    #     cursor.close()
    #     return Response({'result': 'ok'}, status=201)
        # data["STAKEHOLDER_ID"] = STAKEHOLDER_ID.id
        # serializer = ConversationsSerializer(data=request.data)
        # if serializer.is_valid():
        #     conver.convo(serializer.data['STAKEHOLDER_ID'])
        #     serializer.save()
        #     return Response(serializer.data, status=201)
        # return Response(serializer.errors, status=400)


# Conversations ViewSet
class ConversationsViewSet(viewsets.ModelViewSet):
    queryset = conversations.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = ConversationsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['STAKEHOLDER', 'QUESTION']

    # @action(detail=True, methods=["PUT"])
    # def conver(self, request, pk=None):
    #         # conver = self.get_object()
    #     postdata = request.data
    #     print(postdata)
    #     cursor = connection.cursor()

    #     for item in postdata["CONVERSATION"]:
    #         query2 = """INSERT INTO "public"."tables_conversations" 
    #                 ("CONVERSATION_ID", "STAKEHOLDER_ID_id", "QUESTION", "RESPONSE") VALUES (%s, %s, %s)"""
    #         cursor.execute(query2, (item["CONVERSATION_ID"], item["STAKEHOLDER_ID"], item["QUESTION"], item["RESPONSE"]))
    #     cursor.close()
    #     return Response({'result': 'ok'}, status=201)

    # def get_queryset(self):
    #     queryset = conversations.objects.all()
    #     return queryset
    
    # def create(self, request, *args, **kwargs):
    #     data = request.data
    #     new_convo = conversations.objects.create(STAKEHOLDER_ID=stakeholders.objects.get(STAKEHOLDER_ID=data['STAKEHOLDER_ID']),QUESTION=data["QUESTION"], RESPONSE=data["RESPONSE"])
    #     new_convo.save()
    #     serializer = ConversationsSerializer(new_convo)
    #     return Response(serializer.data)

class multi_conv(APIView):
    def put(self, request, *args, **kwargs):
        STAKEHOLDER = self.request.query_params.get('STAKEHOLDER')
        if STAKEHOLDER == None:
            return Response({'status': 'details'}, status=status.HTTP_404_NOT_FOUND)
        for updated_conv in request.data:
            extant_conv = conversations.objects.get(STAKEHOLDER = STAKEHOLDER, CONVERSATION = updated_conv['CONVERSATION'])
            serializer = ConversationsSerializer(extant_conv, data=updated_conv)
            if serializer.is_valid(): 
                serializer.save()
        conv_query = conversations.objects.filter(STAKEHOLDER = STAKEHOLDER).values()
        return Response(conv_query)

class multi_stake(APIView):
    def put(self, request, *args, **kwargs):
        SCENARIO = self.request.query_params.get('SCENARIO')
        if SCENARIO == None:
            return Response({'status': 'details'}, status=status.HTTP_404_NOT_FOUND)
        for updated_stake in request.data:
            extant_stake = stakeholders.objects.get(SCENARIO = SCENARIO, STAKEHOLDER = updated_stake['STAKEHOLDER'])
            serializer = StakeholdersSerializer(extant_stake, data=updated_stake)
            if serializer.is_valid(): 
                serializer.save()
        stake_query = stakeholders.objects.filter(SCENARIO = SCENARIO).values()
        return Response(stake_query)

class multi_coverage(APIView):
    def put(self, request, *args, **kwargs):
        STAKEHOLDER = self.request.query_params.get('STAKEHOLDER')
        if STAKEHOLDER == None:
            return Response({'status': 'details'}, status=status.HTTP_404_NOT_FOUND)
        for updated_coverage in request.data:
            extant_coverage = coverage.objects.get(STAKEHOLDER = STAKEHOLDER, ISSUE = updated_coverage['ISSUE'])
            serializer = coverageSerializer(extant_coverage, data=updated_coverage)
            if serializer.is_valid(): 
                serializer.save()
        coverage_query = coverage.objects.filter(STAKEHOLDER = STAKEHOLDER).values()
        return Response(coverage_query)




class CoverageViewSet(viewsets.ModelViewSet):
    queryset = coverage.objects.all()
    permission_classe = [permissions.AllowAny]
    serializer_class = coverageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['STAKEHOLDER']

# class StakeholderListView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
#     # queryset = stakeholders.objects.all()
#     # permissions_classes = [
#     #     permissions.AllowAny
#     # ]
#     # serializer_class = StakeholdersSerializer
#     # lookup_field = "NAME"

#     def get(self, request, NAME=None):
#         if NAME:
#             return self.retrieve(request, NAME)
#         else:
#             return self.list(request)

#     def post(self, request):
#         return self.create(request)


#     def put(self, request, NAME=None):
#         return self.update(request)

#     def delete(self, request, NAME=None):
#         return self.destroy(request)
    

    

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
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['SCENARIO', "NAME"]

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
            print("scenario saved incorrectly")
            return Response(scenario_serializer.errors)
        scenario_serializer.save()
        scenario_dict = scenario_serializer.data
        
        #get array of courses from frontend
        COURSES = request.data['COURSES']
        for course in COURSES:
            scenarios_for_dict = {
                "SCENARIO" : scenario_dict['SCENARIO'],
                "COURSE" : course['COURSE'],
                "VERSION" : scenario_dict['VERSION']
            }
            print(scenarios_for_dict)
            print(scenario_dict)
            for_serializer = Scenarios_forSerializer(data=scenarios_for_dict)
            if not for_serializer.is_valid():
                print("scenarios_for saved incorrectly")
                return Response(for_serializer.errors)

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


class coverages_page(APIView):
    def put(self, request, *args, **kwargs):
        # """
        # docstring
        # """
        data = JSONParser().parse(request)

        if type(data) == list:
            response = []
            for item in data:
                stkholderid = item['STAKEHOLDER']
                issueid = item['ISSUE']
                updatingItem = coverage.objects.get(
                    STAKEHOLDER=stkholderid, ISSUE=issueid)
                serializer = coverageSerializer(
                    updatingItem, data=item)
                if serializer.is_valid():
                    serializer.save()
                    response.append(serializer.data)
                else:
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)

            return Response(response, status=status.HTTP_200_OK)
        else:
            stkholderid = data['STAKEHOLDER']
            issueid = data['ISSUE']
            updatingItem = coverage.objects.get(
                STAKEHOLDER=stkholderid, ISSUE=issueid)
            serializer = coverageSerializer(
                updatingItem, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class stakeholders_page(APIView):
    
    def add_detail(self, stkholders):

        for stkholder in stkholders:
            stakeholder_id = stkholder['STAKEHOLDER']

            queryset = conversations.objects.filter(STAKEHOLDER=stakeholder_id)
            conList = ConversationsSerializer(queryset, many=True).data
            stkholder['CONVERSATIONS'] = conList

            try: 
                coverage_list = coverage.objects.filter(STAKEHOLDER=stakeholder_id).values()
            except coverage.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            issue_list = []
            # Check for every single coverage object that belongs to the staheholder id 'id' 
            for coverages in coverage_list:
                issues_dict = {}
                # issueList = coverageSerializer(coverage.objects.get(ISSUE=issueID)).data
                # issueList.update({"NAME": IssuesSerializer(Issues.objects.get(ISSUE=issueID)).data['NAME']})
                # Getting the issue for the coverage dictionary associated with the stakeholder_id
                try:
                    issue = Issues.objects.get(ISSUE=coverages.get('ISSUE_id'))
                except:
                    continue
                issues_dict.update(coverages)
                del issues_dict['id']
                issues_dict['ISSUE'] = issues_dict['ISSUE_id']
                del issues_dict['ISSUE_id']
                issues_dict['STAKEHOLDER'] = issues_dict['STAKEHOLDER_id']
                del issues_dict['STAKEHOLDER_id']
                issues_dict.update(
                    {
                        "NAME": issue.NAME
                    })

                issue_list.append(issues_dict)
            
            stkholder.update(
                {
                    "ISSUES": issue_list
                }
            )

        return stkholders

        '''
        page_data = PagesSerializer(page).datapage_data.update(
                {
                    "REFLECTION_QUESTIONS": reflection_query
                }
            )
 reflection_query = reflection_questions.objects.filter(PAGE = PAGE_ID).values()
            page_data.update(
                {
                    "REFLECTION_QUESTIONS": reflection_query
                }
            )
        '''

    def get(self, request, *args, **kwargs):
        '''
        return format
        [
            {
                "STAKEHOLDER": 3,
                "NAME": "Mon",
                "DESCRIPTION": "This is Mon",
                "JOB": "Driver",
                "INTRODUCTION": "Mon is a driver",
                "SCENARIO": 1,
                "VERSION": 1,
                "CONVERSATIONS": [
                    {
                        "CONVERSATION": 4,
                        "QUESTION": "Question 1",
                        "RESPONSE": "Answer 1",
                        "STAKEHOLDER": 3
                    }
                ],
                "ISSUES": [
                    {
                        "ISSUE": 4,
                        "NAME": "Issue 3",
                        "IMPORTANCE_SCORE": 10.0,
                        "SCENARIO": 1,
                        "VERSION": 1
                    }
                ]
            },
        ]
        parse scenario_id and stakeholder_id from the request URL
        example
        http://127.0.0.1:8000/stakeholders?scenario_id=3
        http://127.0.0.1:8000/stakeholders?stakeholder_id=0
        '''
        SCENARIO_ID = self.request.query_params.get('scenario_id')
        STAKEHOLDER_ID = self.request.query_params.get('stakeholder_id')
        # STAKEHOLDER_ID = self.request.GET.get('stakeholder_id')

        # handle request for scenario_id
        # get all stakeholder in scenario with id = scenario_id
        if SCENARIO_ID != None:
            # checking valid scenario ID
            try:
                # return empty if scenario doesn't have any stakeholder
                # return list of stakeholder belong to that scenario
                scenarios.objects.get(SCENARIO=SCENARIO_ID)
                queryset = stakeholders.objects.filter(
                    SCENARIO=SCENARIO_ID)
                data = list(StakeholdersSerializer(queryset, many=True).data)
                data = self.add_detail(data)
                return Response(data, status=status.HTTP_200_OK)

            # return an error for non-existed scenario id
            except scenarios.DoesNotExist:
                message = {'MESSAGE': 'INVALID SCENARIO ID'}
                return Response(message, status=status.HTTP_404_NOT_FOUND)

        # handle request for stakeholder_id
        # get the stakeholder id = stakeholder_id
        if STAKEHOLDER_ID != None:
            try:
                queryset = stakeholders.objects.filter(
                    STAKEHOLDER=STAKEHOLDER_ID)
                data = list(StakeholdersSerializer(queryset, many=True).data)
                data = self.add_detail(data)
                return Response(data, status=status.HTTP_200_OK)

            except stakeholders.DoesNotExist:
                message = {'MESSAGE': 'INVALID STAKEHOLDER ID'}
                return Response(message, status=status.HTTP_404_NOT_FOUND)

        queryset = stakeholders.objects.all()
        data = StakeholdersSerializer(queryset, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
    
        serializer = StakeholdersSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            stkholderid = serializer.data['STAKEHOLDER']
            scenarioid = serializer.data['SCENARIO']
            queryset = Issues.objects.filter(SCENARIO=scenarioid)
            data = IssuesSerializer(queryset, many=True).data
            for item in data:
                itemdict = {}
                itemdict['STAKEHOLDER'] = stkholderid
                itemdict['ISSUE'] = item['ISSUE']
                itemdict['NAME'] = item['NAME']
                itemdict['COVERAGE_SCORE'] = 0
                print(itemdict)
                itemSerializer = coverageSerializer(data=itemdict)
                if itemSerializer.is_valid():
                    itemSerializer.save()
                else:
                    return Response(itemSerializer.errors,
                                    status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):

        STAKEHOLDER_ID = self.request.query_params.get('stakeholder_id')

        if STAKEHOLDER_ID != None:
            try:
                response = stakeholders.objects.get(
                    STAKEHOLDER_ID=STAKEHOLDER_ID)
                response.delete()
                return Response({'message': 'DELETED'}, status=status.HTTP_202_ACCEPTED)
            except stakeholders.DoesNotExist:
                return Response({'message': 'NOT FOUND'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'message': 'MISSING ID'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        '''
        put can take one object or a list
        for one object put
        {
            "STAKEHOLDER": 1,
            "NAME": "Stakeholder 1a",
            "DESCRIPTION": "Description 1",
            "JOB": "Job 1",
            "INTRODUCTION": "Introduction 1",
            "SCENARIO": 1,
            "VERSION": 1
        }
        for list put
        [
            {
                "STAKEHOLDER": 1,
                "NAME": "Stakeholder 1a",
                "DESCRIPTION": "Description 1",
                "JOB": "Job 1",
                "INTRODUCTION": "Introduction 1",
                "SCENARIO": 1,
                "VERSION": 1
            },
            {
                "STAKEHOLDER": 2,
                "NAME": "Stakeholder 2a",
                "DESCRIPTION": "Description 2",
                "JOB": "Job 2",
                "INTRODUCTION": "Introduction 2",
                "SCENARIO": 1,
                "VERSION": 1
            }
        ]
        '''
        data = JSONParser().parse(request)

        if type(data) == list:
            response = []
            for item in data:
                id = item['STAKEHOLDER']
                updatingItem = stakeholders.objects.get(STAKEHOLDER=id)
                stkholderSerializer = StakeholdersSerializer(
                    updatingItem, data=item)
                if stkholderSerializer.is_valid():
                    stkholderSerializer.save()
                    response.append(stkholderSerializer.data)
                else:
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)

            return Response(response, status=status.HTTP_200_OK)
        else:
            id = data['STAKEHOLDER']
            updatingItem = stakeholders.objects.get(STAKEHOLDER=id)
            stkholderSerializer = StakeholdersSerializer(
                updatingItem, data=data)
            if stkholderSerializer.is_valid():
                stkholderSerializer.save()
                return Response(stkholderSerializer.data, status=status.HTTP_200_OK)
            else:
                return Response(stkholderSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


class coverages_page(APIView):
    def get(self, request, *args, **kwargs):
        stakeholder_id = self.request.query_params.get('stakeholder_id')

        stkholder = {}
        try: 
            coverage_list = coverage.objects.filter(STAKEHOLDER=stakeholder_id).values()
        except coverage.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        issue_list = []
        # Check for every single coverage object that belongs to the staheholder id 'id' 
        for coverages in coverage_list:
            issues_dict = {}
                # issueList = coverageSerializer(coverage.objects.get(ISSUE=issueID)).data
                # issueList.update({"NAME": IssuesSerializer(Issues.objects.get(ISSUE=issueID)).data['NAME']})
                # Getting the issue for the coverage dictionary associated with the stakeholder_id
            try:
                issue = Issues.objects.get(ISSUE=coverages.get('ISSUE_id'))
            except:
                continue
            issues_dict.update(coverages)
            del issues_dict['id']
            issues_dict['ISSUE'] = issues_dict['ISSUE_id']
            del issues_dict['ISSUE_id']
            issues_dict['STAKEHOLDER'] = issues_dict['STAKEHOLDER_id']
            del issues_dict['STAKEHOLDER_id']
            issues_dict.update(
                {
                    "NAME": issue.NAME
                })

            issue_list.append(issues_dict)
            
        stkholder.update(
            {
                "ISSUES": issue_list
            }
        )

        return Response(stkholder, status=status.HTTP_200_OK)


