import pytest

from selenium import webdriver
from selenium.webdriver.chrome.service import Service

@pytest.fixture(scope="class")
def class_setup(request):
  srv_obj = Service(r"..\drivers\chromedriver-win64\chromedriver.exe")
  driver = webdriver.Chrome(service=srv_obj)
  driver.maximize_window()
  # Setup the base URL
  driver.get("http://main.norhome.casa:60006/en/customer/login")
  request.cls.driver = driver
  yield
  driver.close()
