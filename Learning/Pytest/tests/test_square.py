import math
import pytest
import src.shapes as shapes

#parametrize is good when you are doing the same test on simiilar simple objects
#this returns a list of tupiles for side_length and expected_area
@pytest.mark.parametrize("side_length, expected_area", [(5,25), (4,16), (9,81)])
def test_multiple_square_areas(side_length, expected_area):
    assert shapes.Square(side_length).area() == expected_area

#this will run the above test for all tuples in the list matching with their respected variable name

@pytest.mark.parametrize("side_length, expected_perimeter", [(3,12),(4,16), (5,20)])
def test_multiple_perimeter(side_length, expected_perimeter):
    assert shapes.Square(side_length).perimeter() == expected_perimeter