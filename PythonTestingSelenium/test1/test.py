from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
#selenium script is resulting in the browser closing automatically is because it has reached the end of execution.
#need to add "detach option" to detach browser from script
options = webdriver.ChromeOptions()
options.add_experimental_option("detach", True)
#c_Service = Service(executable_path="C:\Drivers\chromedriver-win64\chromedriver.exe")

#driver is an object of the chrome class
#opens chrome
#driver = webdriver.Chrome(service = c_Service, options=options)
driver = webdriver.Chrome(options=options)
#goes to specific url
driver.get("https://opensource-demo.orangehrmlive.com/auth/login")
#need to make wait object and use EC object (expected_conditions) to wait until the page actually loads 
#so it can find the elements, otherwise you will get an error saying it does not exist
wait = WebDriverWait(driver, 10)

wait.until(EC.presence_of_element_located((By.NAME, "username"))).send_keys("Admin")


#finding element by name and sending the input "Admin"
#driver.find_element(By.NAME,"username").send_keys("Admin")
driver.find_element(By.NAME,'password').send_keys("admin123")

#You are using XPath as the method to find the element. XPath is a powerful query language for selecting nodes from an XML or HTML document. In Selenium, it helps in locating elements in a complex or deeply nested structure.
#"//" means "anywhere in the document," so it will search for the element throughout the page.
#"button"  specifies the HTML tag you're looking for (a <button> element).
#"[@type='submit']"  is a condition, meaning the button should have an attribute type with the value submit.
driver.find_element(By.XPATH, "//button[@type='submit']").click()

act_title = driver.title
print(act_title)
exp_title = "OrangeHRM"
if act_title == exp_title:
    print("Login test pass")
else:
    print("login test fail")


