from django.shortcuts import render
from .models import Post

# since this is a new app we need to tell our django project in settings.py
# that we added a new app to the project


# Create your views here.
def posts_list(request):
    posts = Post.objects.all().order_by("-date")
# even though django project can use all templates within ur project
# once there is more, except for the most global, you should add parent directory
# 3rd paramater is a Dictionary for the posts we have in our model.
    return render(request,'posts/posts_list.html', {"posts": posts})


def post_page(request, slug):
    # this will get the one post we have that matches the slug that was passed through
    post = Post.objects.get(slug=slug)
    return render(request,'posts/post_page.html', {"post": post})
