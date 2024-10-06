import requests
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


#we are testing get_users but we dont want to use actual API we want to mock requests.get instead
@mock.patch("requests.get")
def test_get_users(mock_get):
    mock_response = mock.Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"id": 1, "name": "John Doe"}
    mock_get.return_value = mock_response
    data = service.get_users()
    assert data == {"id": 1, "name": "John Doe"}

#again this doesnt check to see if the API is working 
#rather, if it works the structure of whats returned (what you are mocking) should look the same as what you expect

#since we mocked status code 400 it should raise proper error 
@mock.patch("requests.get")
def test_get_users_error(mock_get):
    mock_response = mock.Mock()
    mock_response.status_code = 400
    mock_get.return_value = mock_response
    with pytest.raises(requests.HTTPError):
        service.get_users()
