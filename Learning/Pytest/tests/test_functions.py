import pytest
import src.functions as functions 
import time 


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

#pytest Marking is a way to add metadata to tests (tagging ur tests with labels that can influence how the tests run ect)
#can label some tests as 'slow' or 'skip'

#SLOW TAG
@pytest.mark.slow
def test_slow():
    time.sleep(5)
    result = functions.divide(10,5)
    assert result == 2
#we can run test that only have a spicific tag by 'pytest -m tagname(in this case 'slow')'
#we can run test that DONT have a spicific tag by 'pytest -m "not slow"' (this will run all tests without the tagname slow)

#.skip mark will auto skip this test
@pytest.mark.skip(reason="you can also add reasons for speicifc marks")
def test_add_skip():
    assert functions.add(1,2) == 3

#xfail tag means expected fail, you can also add a reason
@pytest.mark.xfail(reason="trying to divide by 0 when we know we cannot")
def test_divide_xfail():
     functions.divide(10,0)
    