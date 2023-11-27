import sys
sys.path.append("../tests")
from base_test import BaseTest
from selenium import webdriver
sys.path.append("../pages")
from pages.login_page import LoginPage

class TestLogin(BaseTest):

  def test_positive_login(self):
    self.login_page = LoginPage(self.driver)
    logger = self.get_logger("Login")
    logger.info("=== STARTING TEST ===")
    # Pending to fix hardcoded data
    logger.info("Setting the information in the loging form")
    user = "jperez@local.local"
    password = "password"
    logger.debug("User: {} Password: {}".format(user, password))
    self.login_page.set_credentials(user, password)
    logger.info("Clicking on SignIn Button")
    self.login_page.do_login()
    logger.info("Test Case Finished")
