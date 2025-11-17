# portfolio/views.py

from django.shortcuts import render
from django.http import FileResponse # download_cv-এর জন্য

# 1. Home Page View
def index(request):
    # ধরে নিলাম index.html টেমপ্লেটটি আছে
    return render(request, 'index.html') 

# 2. About Page View
def about(request):
    # ধরে নিলাম about.html টেমপ্লেটটি আছে
    return render(request, 'about.html')

# 3. Projects Page View
def projects(request):
    # ধরে নিলাম projects.html টেমপ্লেটটি আছে
    return render(request, 'projects.html')

# 4. Research Page View
def research(request):
    # ধরে নিলাম research.html টেমপ্লেটটি আছে
    return render(request, 'research.html')

# 5. YouTube Page View
def youtube(request):
    # ধরে নিলাম youtube.html টেমপ্লেটটি আছে
    return render(request, 'youtube.html')

# 6. Contact Page View
def contact(request):
    # ধরে নিলাম contact.html টেমপ্লেটটি আছে
    return render(request, 'contact.html')

# 7. CV Download View (উদাহরণস্বরূপ একটি .pdf ফাইল ডাউনলোড হবে)
def download_cv(request):
    # ***আপনার CV ফাইলের সঠিক পাথ এখানে দিন***
    cv_path = 'static/files/Arman_CV.pdf' # উদাহরণ: static/files ফোল্ডারে আছে
    return FileResponse(open(cv_path, 'rb'), content_type='application/pdf')