import pytest

from selenium import webdriver
from selenium.webdriver.chrome.service import Service


def pytest_addoption(parser):
    parser.addoption("--browser_name", action="store", default="chrome")


@pytest.fixture(scope="class")
def class_setup(request):

  browser_name = request.config.getoption("browser_name")
  if browser_name == "chrome":
    srv_obj = Service(r"..\drivers\chromedriver-win64\chromedriver.exe")
    driver = webdriver.Chrome(service=srv_obj)
  elif browser_name == "firefox":
    srv_obj = Service(r"..\drivers\geckodriver-v0.33.0-win64\geckodriver.exe")
    driver = webdriver.Firefox(service=srv_obj)
  else:
     raise Exception("Not supported web driver")

  driver.maximize_window()
  # Setup the base URL
  driver.get("http://main.norhome.casa:60006/en/customer/login")
  request.cls.driver = driver
  yield
  driver.close()
