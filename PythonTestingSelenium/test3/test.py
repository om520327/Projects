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
# Retrieve the path from the environment variable
chrome_driver_path = os.getenv('CHROME_DRIVER_PATH')
serv_obj = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=serv_obj,options=options)
driver.get("https://practice-automation.com/")
wait = WebDriverWait(driver,10)
driver.maximize_window()
#time.sleep(3)
actions = ActionChains(driver)
actions.send_keys(Keys.PAGE_DOWN).perform()
time.sleep(2)
slider_link = wait.until(EC.element_to_be_clickable((By.PARTIAL_LINK_TEXT, "Sliders")))
slider_link.click()
time.sleep(2)
slider = driver.find_element(By.XPATH,"//input[@type='range']")
slider_width= slider.size['width']
# Get the min, max, and current value attributes
min_value = float(slider.get_attribute('min'))
max_value = float(slider.get_attribute('max'))
current_value = float(slider.get_attribute('value'))

# Desired value (e.g., move to beg)
desired_value = min_value

offset = ((desired_value - min_value) / (max_value - min_value)) * slider_width
#click instead opf drag and drop 
# Move the slider to the beginning (negative half the width to move to the left)
actions.move_to_element_with_offset(slider, -(slider_width / 2), 0).click().perform()
time.sleep(2)
desired_value = 0.5 * max_value

offset = ((desired_value - min_value) / (max_value - min_value)) * slider_width
#Drag the slider by an offset (e.g., 50 pixels to the right)
actions.click_and_hold(slider).move_by_offset(offset, 0).release().perform()
