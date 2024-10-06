import pytest
import src.service as service
import unittest.mock as mock

#path to what is being tests in this case a specific function
#.patch is saying use "get_user_from_db" from our service 
#and replace it with "mock_get_user_from_db"
@mock.patch("src.service.get_user_from_db")
def test_get_user_from_db(mock_get_user_from_db):
    #whenever we call from this test we want result to be "Mocked Alice"
    mock_get_user_from_db.return_value = "Mocked Alice"
    user_name = service.get_user_from_db(1)
    assert user_name == "Mocked Alice"

#in this case the test wouldnt be to see if the DB is working
#rather to see that the response is what you would expect