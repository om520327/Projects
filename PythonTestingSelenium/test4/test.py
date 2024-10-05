import os
from dotenv import load_dotenv
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

load_dotenv()
chrome_driver_path = os.getenv('CHROME_DRIVER_PATH')
options = webdriver.ChromeOptions()
options.add_experimental_option("detach", True)
serv_obj = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=serv_obj,options=options)
wait = WebDriverWait(driver, 10)
driver.get("https://practice-automation.com/")
driver.maximize_window()
time.sleep(2)
#xpath has or, and, //input[contains(@TAG,'value')], //input[starts-with(@TAG,'value')], //a[text()=''] methods you can add
driver.find_element(By.LINK_TEXT,"Form Fields").click()
driver.find_element(By.XPATH,("//input[@id='name-input'and @name='name-input']")).send_keys("OMar")
driver.find_element(By.XPATH,("//input[starts-with(@type,'pass')]")).send_keys("OMar")
driver.find_element(By.XPATH,("//input[contains(@id,'ink')]")).click()
