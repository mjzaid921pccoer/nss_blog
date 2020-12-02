
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By


from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.support.ui import WebDriverWait as  wait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome("C:/Users/PP186061/28_10/chromedriver.exe",chrome_options=options)

driver.get("https://prod-sched.1cp.pg.com/scheduleIn/login/auth")
time.sleep(5)
driver.maximize_window()



# Username
var1 = "sushant"
driver.find_element_by_id("username").send_keys(var1)
time.sleep(5)

# Password
var2 = "sush123"
driver.find_element_by_id("password").send_keys(var2)
time.sleep(5)

#click on login button
driver.find_element_by_id('loginButton').click()
time.sleep(20)