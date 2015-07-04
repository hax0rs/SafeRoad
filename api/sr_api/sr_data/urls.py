from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^year/$', views.yearly, name='yearly'),
    url(r'^hour/$', views.hourly, name='hourly'),
]
