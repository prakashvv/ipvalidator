from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^(?P<machine_id>[0-9]+)/$', views.interfaces, name='interfaces'),
    url(r'^$', views.index, name='index'),
    url(r'^machines/', views.MachineList.as_view()),
    url(r'^interfaces/', views.InterfaceList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
