from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path
from django.conf import settings
from .views import *
# DemographicsViewSet, allScenariosViewSet, StudentsViewSet, ProfessorsViewSet, ScenariosViewSet, Choices_forViewSet, Stakeholder_pageViewSet, ConversationsViewSet, Stakeholder_inViewSet, StakeholdersViewSet

router = routers.DefaultRouter()
router.register('api/demographics', DemographicsViewSet, 'demographics')
router.register('api/students', StudentsViewSet, 'students')
router.register('api/professors', ProfessorsViewSet, 'professors')
router.register('api/scenarios', ScenariosViewSet, 'scenarios')
router.register('api/pages', PagesViewSet, 'pages')
router.register('api/choices_for', Choices_forViewSet, 'choices_for')
router.register('api/stakeholder_page', Stakeholder_pageViewSet, 'stakeholder_page')
router.register('api/reflection_questions', Reflection_QuestionsViewSet, 'reflection_questions')
router.register('api/stakeholders', StakeholdersViewSet, 'stakeholders')
router.register('api/conversations', ConversationsViewSet, 'conversations')
router.register('api/stakeholder_in', Stakeholder_inViewSet, 'stakeholder_in')
router.register('api/reflectionstaken', ReflectionsTakenViewSet, 'reflectionstaken')
router.register('api/conversationshad', ConversationsHadViewSet, 'conversationshad')
router.register('api/studentsin', StudentsInViewSet, 'studentsin')
router.register('api/courses', CoursesViewSet, 'courses')
router.register('api/responses', ResponsesViewSet, 'responses')
router.register('api/scenarios_for', Scenarios_forViewSet, 'scenarios_for')
router.register('api/generic_page', generic_pageViewSet, 'generic_page')
router.register('api/professors_teach', Professors_teachViewSet, 'professors_teach')
router.register('api/single_scenario', SingleScenarioViewSet, 'single_scenario')
# router.register('api/allScenarios', allScenariosViewSet.as_view())

urlpatterns = [
    path('allScenarios', allScenariosViewSet.as_view())
] 

urlpatterns += router.urls