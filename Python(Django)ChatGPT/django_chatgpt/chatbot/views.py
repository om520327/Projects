import os
import openai
from openai.types.chat import ChatCompletion
from django.shortcuts import render
from django.http import JsonResponse
from dotenv import load_dotenv
from openai import OpenAI
from django.contrib import auth

### Since we are using LLM STUDIO set up is a little different than openai ###
# load_dotenv()
# api_key = os.getenv("OPENAI_API_KEY")
# openai.api_key = api_key


client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

def response_ai(message): 

    response = client.chat.completions.create(
        # Specifies the OpenAI model  
        model = "lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF",
        # The message you send to the model as input.
        messages = [{"role": "user", "content": message}],
        # Limits the length of the response (150 tokens here).
        max_tokens = 150,
        #  Specifies how many completions (responses) to generate. Here, n=1 requests only one response.
        n=1,
        # Defines where the API should stop generating tokens, which can be set to specific text patterns.
        stop = None,
        #  Controls randomness. Lower values (e.g., 0.2) make output more deterministic, while higher values (e.g., 0.7) make it more creative.
        temperature = 0.7,

    )

# The response from OpenAI is stored in response.
# response.choices: A list of all generated responses (in this case, a list with a single item because n=1).
# response.choices[0].text: Accesses the text attribute of the first (and only) choice.
    answer = response.choices[0].message.content.strip()
    return answer

# Create your views here.
# We specified in setting.py what directory to use for our templates 
# So our program knows the location of where chatbot.html is 
def chatbot(request):
    if request.method == 'POST':
        message = request.POST.get('message')
        response = response_ai(message)
        return JsonResponse({'messsage':message, 'response':response})

    return render(request,'chatbot.html')


def login(request):
    return render(request,'login.html')


def register(request):
    return render(request,'register.html')


def logout(request):
    auth.logout(request)