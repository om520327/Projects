import pytest
import src.functions as functions 


#assert only lets program cont if it is true, otherwise assertion error is raised which stops program
def test_add():
    result = functions.add(1,4)
    assert result == 5

def test_add_string():
    result = functions.add("Lets See ", "What Happens")
    assert result == "Lets See What Happens"

def test_divide():
    result = functions.divide(10,5)
    assert result == 2

#will test that the error is what you get
def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        functions.divide(10,0)

