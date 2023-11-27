from selenium import webdriver
from selenium.webdriver.common.by import By

class LocatorLogin(object):

  def __init__(self, driver):
    self.name_css = "my_page_name"
    assert isinstance(driver, webdriver.Chrome)
    self.txt_email = driver.find_element(
      By.CSS_SELECTOR, r"input[type='email']")
    self.txt_password = driver.find_element(
      By.CSS_SELECTOR, r"input[type='password']")
    self.btn_signin = driver.find_element(
      By.XPATH, r"//button[text()='Sign In']")
    self.link_forgot_pass = driver.find_element(
      By.XPATH, r"//a[text()='Forgot Password?']")
    self.txt_search = driver.find_element(
      By.CSS_SELECTOR, r"input[class='uv-nav-search']")
    self.link_contactus = driver.find_element(
      By.XPATH, r"//a[text()='Contact Us']")
