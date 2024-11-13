from django.db import models
# models.py models ur data and each type of data will have a table inm a db
# we use migration to take our python code here and turn it into tables  

# Create your models here.

# this is the post model or table
class Post(models.Model):
    # these are the fields in our model/table
    # this is the same as defining title as a VARCHAR with 75 char
    # these fields also relate to form inputs(how you accept the data for each field) which should be kept in mind
    title = models.CharField(max_length=75)
    body =  models.TextField()
    slug = models.SlugField()
    # "auto_now_add=True" means a date time stamp will be added everytime a user adds another post
    date = models.DateTimeField(auto_now_add=True)

