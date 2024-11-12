from django.shortcuts import render
# since this is a new app we need to tell our django project in settings.py
# that we added a new app to the project
# Create your views here.
def posts_list(request):
    return render(request,'')