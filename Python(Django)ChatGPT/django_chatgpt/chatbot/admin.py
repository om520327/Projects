from django.contrib import admin
from .models import Chat
# Register your models here.
# so on django admin page we can see chat DB
admin.site.register(Chat)