import pytest
import src.functions as functions 


#assert only lets program cont if it is true, otherwise assertion error is raised which stops program
def test_add():
    result = functions.add(1,4)
    assert result == 5