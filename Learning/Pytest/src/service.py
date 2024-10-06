#mocking: when you want to test a DB or API but dont want to use the actual
#source due to them being slow or not stable or have changing data within them
#you make a mock of whatever you are testing and test for the desired outcome

#pretend real database
database = {
    1: "Alice",
    2: "Bob",
    3: "Hero",
    4: "Dave",
    5: "Kim",
    6: "Simon"
}

def get_user_from_db(user_id):
    return database.get(user_id)