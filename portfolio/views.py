from django.shortcuts import render
import os
from django.conf import settings
from django.http import FileResponse 

def index(request):
    return render(request, 'index.html') 

def about(request):
    return render(request, 'about.html')

def projects(request):
    return render(request, 'projects.html')

def research(request):
    return render(request, 'research.html')

def youtube(request):
    return render(request, 'youtube.html')

def contact(request):
    return render(request, 'contact.html')

def download_cv(request):
    cv_path = os.path.join(settings.BASE_DIR, 'portfolio', 'static', 'files', 'Arman_CV.pdf')

    return FileResponse(open(cv_path, 'rb'), as_attachment=True, filename='Arman_CV.pdf')