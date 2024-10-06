import math
import pytest
import src.shapes as shapes

@pytest.fixture
def my_rectangle_global():
    return shapes.Rectangle(20,40)

@pytest.fixture
def other_rectangle_global():
    return shapes.Rectangle(10,12)