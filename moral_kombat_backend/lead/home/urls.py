from rest_framework import routers
from .api import HomeViewSet

router = routers.DefaultRouter()
router.register('api/home', HomeViewSet, 'home')

urlpatterns = router.urls