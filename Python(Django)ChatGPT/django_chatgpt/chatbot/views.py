import os
import openai
from openai.types.chat import ChatCompletion
from django.shortcuts import redirect, render
from django.http import JsonResponse
from dotenv import load_dotenv
from openai import OpenAI
from django.contrib import auth
from django.contrib.auth.models import User

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
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        # authenticating the password and username exsist
        user = auth.authenticate(request, username=username, password=password)
        # if user exsists we login user then redirect them to chatbot page
        if user is not None:
            auth.login(request, user)
            return redirect('chatbot')
        else:
            error_message = "invalid username or password"
            return render(request, 'login.html', {'error_message' : error_message})
    else:
        return render(request,'login.html')

# want to add cred to db and auto log user in
# in register.html we have a form for users cred
# once register button is clicked, that info is sent here in "request"
# we want to extract that info in order to store it in out db for future login
def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        if password1 ==  password2:
            try:
                # user is created and saved
                user = User.objects.create_user(username, email, password1)
                user.save()
                # now we log user in automatically after  registration 
                auth.login(request, user)
                # take user back to chatbot
                return redirect('chatbot')
            except:
                error_message = 'Error creating account'
                return render(request,'register.html', {'error_message':error_message})
        else:
            error_message = 'Passwords dont match'
            return render(request,'register.html', {'error_message':error_message})


    return render(request,'register.html')


def logout(request):
    auth.logout(request)
    return redirect('login')