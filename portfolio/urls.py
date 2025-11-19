from django.urls import path
from . import views 

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('projects/', views.about, name='projects'),
    path('research/', views.about, name='research'),
    path('youtube/', views.about, name='youtube'),
    path('contact/', views.youtube, name='contact'),

    path('download_cv/', views.download_cv, name='download_cv'),
]
