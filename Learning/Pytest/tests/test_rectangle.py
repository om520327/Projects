import math
import pytest
import src.shapes as shapes

#when doing functional tests you dont have a setup_method thats good for intializing conditions like we do in class based
#instead we have fixtures for functional tests

#with this fixture we dont have to intialize a rectangle for every test
#we just pass in the fixtue function name to our test functions
#to make a fixture global to all test files put it in a file called 'conftest.py'
@pytest.fixture
def my_rectangle():
    return shapes.Rectangle(10,20)

@pytest.fixture
def other_rectangle():
    return shapes.Rectangle(5,6)

def test_not_equal(my_rectangle, other_rectangle):
    assert my_rectangle != other_rectangle


def test_area(my_rectangle):
    assert my_rectangle.area() == (10 * 20)


def test_perimeter(my_rectangle):
    assert my_rectangle.perimeter() == (10 * 2) + (20 * 2)

#fixture 'my_rectangle_global' defined in 'conftest.py' file so it is global to all test files
def test_area_global(my_rectangle_global):
    assert my_rectangle_global.area() == (20 * 40)


def test_perimeter_global(my_rectangle_global):
    assert my_rectangle_global.perimeter() == (20 * 2) + (40 * 2)