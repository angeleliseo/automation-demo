import sys
from selenium import webdriver
sys.path.append("../resources")
from resources.locator_login import LocatorLogin

class LoginPage:

  def __init__(self, driver):
    assert isinstance(driver, webdriver.Chrome)
    self.driver = driver
    self.login_locators = LocatorLogin(self.driver)

  def set_credentials(self, user: str, password: str):
    self.login_locators.txt_email.send_keys(user)
    self.login_locators.txt_password.send_keys(password)

  def do_login(self):
    self.login_locators.btn_signin.click()

  def search_text(self, search_text: str):
    self.login_locators.txt_search.send_keys(search_text)
    self.login_locators.txt_search.submit()

  def hit_forgot_password(self):
    self.login_locators.link_forgot_pass.click()

  def hit_contact_us(self):
    self.login_locators.link_contactus.click()