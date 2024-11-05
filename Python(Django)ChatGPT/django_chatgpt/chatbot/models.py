from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# Defines a new model class called Chat that inherits from models.Model, making it a Django model. This class will be represented as a database table.
# Each instance of the Chat class represents a record (or "row") in the Chat table.
class Chat(models.Model):
    # Creates a foreign key relationship with the User model, associating each Chat entry with a specific User.
    # on_delete=models.CASCADE specifies that if a User is deleted, all associated Chat entries will also be deleted, maintaining referential integrity in the database.
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # models.TextField() is used to store large amounts of text, making it ideal for chat messages of varying length.
    message = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) 

    #  returns a readable string representation of the Chat instance
    # The method formats the output as '{username}: {message}', where self.user.username displays the username of the associated user, and self.message shows the message content.
    def __str__(self):
        return f'{self.user.username}: {self.message}'
