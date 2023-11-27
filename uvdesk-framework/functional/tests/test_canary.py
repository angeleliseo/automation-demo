import sys
sys.path.append("../tests")
from base_test import BaseTest
from selenium import webdriver


class TestCanary(BaseTest):

  def test_mycanary(self):
    logger = self.get_logger("canary_test")
    logger.info("Hello from canary")
    local_driver: webdriver.Chrome = self.driver
    logger.info(local_driver.title)
    assert True == True
