from django.db import models
# models.py models ur data and each type of data will have a table in a db
# we use migration to take our python code here (our model) and turn it into tables in our database
# "py manage.py makemigrations" to make ur model migrations first (anytime a new model is added)
# "py manage.py migrate" to do migration 

# Create your models here.

# this is the post model or table
class Post(models.Model):
    # these are the fields in our model/table
    # this is the same as defining title as a VARCHAR with 75 char
    # these fields also relate to form inputs(how you accept the data for each field) which should be kept in mind
    title = models.CharField(max_length=75)
    body =  models.TextField()
    """  
    slug is what you would see at the end of the url  
    A URL-friendly string used to identify resources (e.g., blog posts, products).
    Contains only lowercase/uppercase letters, numbers, hyphens, or underscores.
    
    """
    slug = models.SlugField()
    # "auto_now_add=True" means a date time stamp will be added everytime a user adds another post
    date = models.DateTimeField(auto_now_add=True)

    # we will define a method to return the title of the posts we save in our database
    # since this is not actually changing the data of the model we do not need to do another migration
    def __str__(self):
        return self.title

