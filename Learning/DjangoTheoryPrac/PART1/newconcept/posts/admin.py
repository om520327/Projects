from django.contrib import admin
from .models import Post 
# Register your models here.
# must register each model for each app in projecty in order for it to be shown on admin page

admin.site.register(Post)
