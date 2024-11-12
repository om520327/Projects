from django.urls import path
from . import views

# template folder is where you put html files. in settings.py you
# must let django know where this folder is to use ur html files.
# once you do it you have accsses to all template folders within your project
# that is why we dont have to do anything extra for posts app template folder

urlpatterns = [
    path('', views.posts_list),
]

# since this is url patterns from a app within our project 
# we need to register those urlpatterns in our main url.py file