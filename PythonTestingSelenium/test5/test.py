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
driver.get("https://money.rediff.com/gainers/bse/daily/groupa")
driver.maximize_window()
time.sleep(2)

#you use xpath axes to go to different nodes in dom
#you write xpath of any element then from there you can navigate to any other node using below def
#you can make any node self, the element right ontop is parent, node right under is child
#ancestor node is parent of parent, descendants is child of child
#preceding is any node on top or on same level as self node but to the left.
#following is any node on top or on the same level as self node but to the right
#proceding-sibling is left to self node (same level only) and following-sibling is right to self node (same level only)

#self
text_value=driver.find_element(By.XPATH,"//a[contains(text(),'Sun Pharma Advanced')]/self::a").text
print(text_value)

#parent
text_value_parent=driver.find_element(By.XPATH,"//a[contains(text(),'Sun Pharma Advanced')]/parent::td").text
print(text_value_parent)

#ancestor 
text_value_ancestor=driver.find_element(By.XPATH,"//a[contains(text(),'Sun Pharma Advanced')]/ancestor::tr").text
print(text_value_ancestor)
#ancestor child(parent has no child so we go to ancestor)
descendants=driver.find_elements(By.XPATH,"//a[contains(text(),'Sun Pharma Advanced')]/ancestor::tr/descendant::*")
print("# of descendants:",len(descendants))
#following
following=driver.find_elements(By.XPATH,"//a[contains(text(),'Sun Pharma Advanced')]/ancestor::tr/following::*")
print("# of following:",len(following))
#following-sibling
following_sib=driver.find_elements(By.XPATH,"//a[contains(text(),'Sun Pharma Advanced')]/ancestor::tr/following-sibling::*")
print("# of following-sibling:",len(following_sib))
#preceding
preceding=driver.find_elements(By.XPATH,"//a[contains(text(),'Sun Pharma Advanced')]/ancestor::tr/preceding::*")
print("# of preceding-sibling:",len(preceding))
#preceding-sibling
preceding_sib=driver.find_elements(By.XPATH,"//a[contains(text(),'Sun Pharma Advanced')]/ancestor::tr/preceding-sibling::*")
print("# of preceding-sibling:",len(preceding_sib))

text_value_ancestor_child=driver.find_elements(By.XPATH,"//a[contains(text(),'Sun Pharma Advanced')]/ancestor::tr/child::td")

for element in text_value_ancestor_child:
    print(element.text)

driver.close()