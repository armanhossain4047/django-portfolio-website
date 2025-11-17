# arman_portfolio/urls.py (প্রধান প্রজেক্টের urls.py)

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('portfolio.urls')), 
]