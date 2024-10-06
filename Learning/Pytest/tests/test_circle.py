import math
import pytest
import src.shapes as shapes

#define class based test
class TestCircle:
    
#for class based testing the setup method will run before EACH test
#for class based testing the teardown method will run after EACH test
#must include '-s' for this to occur  EXP:pytest -s tests/
    def setup_method(self,method):
        print(f"Setting up {method}")
        self.circle = shapes.Circle(10)

    def teardown_method(self, method):
        print(f"Tearing down {method}")
        

    def test_area(self):
        assert self.circle.area() == (math.pi * self.circle.radius) ** 2


    def test_perimeter(self):
        assert self.circle.perimeter() == (math.pi * 2 * self.circle.radius)