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
options = webdriver.ChromeOptions()
options.add_experimental_option("detach", True)
chrome_driver_path = os.getenv('CHROME_DRIVER_PATH')
serv_obj = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=serv_obj,options=options)
driver.get("https://www.demostore.se/se/bikes")
wait = WebDriverWait(driver,20)

wait.until(EC.presence_of_element_located((By.PARTIAL_LINK_TEXT,"arri"))).click()
time.sleep(5)
# Scroll to the bottom of the page
actions = ActionChains(driver)
actions.send_keys(Keys.PAGE_DOWN).perform()
time.sleep(5)
driver.find_element(By.LINK_TEXT,"TimesUp").click()


