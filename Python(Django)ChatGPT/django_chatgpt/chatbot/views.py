from django.shortcuts import render

# Create your views here.
#we specified in setting.py what directory to use for our templates 
#so our program knows the location of where chatbot.html is 
def chatbot(request):
    return render(request,'chatbot.html')