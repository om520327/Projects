from django.urls import path
from . import views

# template folder is where you put html files. in settings.py you
# must let django know where this folder is to use ur html files.
# once you do it you have accsses to all template folders within your project
# that is why we dont have to do anything extra for posts app template folder
# by adding the name field we can now use the named URL when reffering to this adress(look in layout.html)

# once or project has more apps, its smart to add a namespace like below
# when linking html and url include name space exp:  <a href="{% url 'posts:page' slug=post.slug %}"> the name space would be posts here
app_name = 'posts'

urlpatterns = [
    path('', views.posts_list, name="list"),
    # we will use a path converter more specificly with slug
    # If the URL is /example-post, the slug variable will have the value 'example-post'.
    # slug (before :): Indicates that the segment should match the slug format.
    # slug (after :): The name of the variable passed to the view.
    # The slug path converter ensures that the dynamic segment of a URL only matches a valid slug pattern.
    path('<slug:slug>', views.post_page, name="page"),
    ]

# since this is url patterns from a app within our project 
# we need to register those urlpatterns in our main url.py file