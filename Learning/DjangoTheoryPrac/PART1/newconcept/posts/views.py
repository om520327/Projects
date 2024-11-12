from django.shortcuts import render
# since this is a new app we need to tell our django project in settings.py
# that we added a new app to the project


# Create your views here.
def posts_list(request):
# even though django project can use all templates within ur project
# once there is more, except for the most global, you should add parent directory
    return render(request,'posts/posts_list.html')