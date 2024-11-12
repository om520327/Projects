# http response was just to to make sure everything is connected
from django.http import HttpResponse
from django.shortcuts import render


# this would connect to the path("", ) code in urls since it is our homepage
# function will get request for the homepage 
def homepage(request):
    # return HttpResponse("hello!!! this is a simple HTTP response to a req for the homepage")
    # render will allow us to render our html files from template folder
    # pass render request and the html page you would like rendered
     return render(request,'home.html')
def about(request):
    # return HttpResponse("My About Page")
    return render(request,'about.html')
