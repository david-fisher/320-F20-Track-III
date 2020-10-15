from rest_framework import routers
from .api import *

router = routers.DefaultRouter()
router.register('api/demographics', DemographicsViewSet, 'demographics')
router.register('api/students', StudentsViewSet, 'students')

urlpatterns = router.urls