import os
from django.shortcuts import render
from django.http import JsonResponse
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
# Create your views here.
#we specified in setting.py what directory to use for our templates 
#so our program knows the location of where chatbot.html is 
def chatbot(request):
    if request.method == 'POST':
        message = request.POST.get('message')
        response = 'test test'
        return JsonResponse({'messsage':message, 'response':response})

    return render(request,'chatbot.html')