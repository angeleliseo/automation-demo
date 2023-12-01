import sys
from selenium import webdriver
sys.path.append("../resources")
from resources.locator_board import LocatorBoard

class BoardPage:

  def __init__(self, driver):
    # Pending to evalute first the browser execution and then cast
    assert isinstance(driver, webdriver.Chrome)
    self.driver = driver
    self.login_locators = LocatorBoard(self.driver)

  def is_loaded(self):
    pass

  def go_create_ticket(self):
    pass

  def search_ticket(self):
    pass

  def search_global(self):
    pass

  def go_ticket_request(self):
    pass

  def sort_tickets(self):
    pass

  def filter_tickets_by(self, status="All"):
    pass