"""
URL configuration for newconcept project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
# include import here allows to connect urls from url.py files from 
# other applications in our project to our main project
from django.urls import path, include
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    # add path for the homepage (base url)
    path('', views.homepage),
    # about page (2nd paramater is what view this url will show)
    path('about/', views.about),
    # from posts/url.py
    # this tells django we want to look inside our posts app and look at the urls file inside our posts
    # application that is created inside our project
    path('posts/', include('posts.urls'))
]