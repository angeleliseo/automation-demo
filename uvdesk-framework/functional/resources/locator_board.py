from selenium import webdriver
from selenium.webdriver.common.by import By

class LocatorBoard(object):

  def __init__(self, driver):
    self.name_css = "my_page_name"
    assert isinstance(driver, webdriver.Chrome)
    #This web_element requires inner navigation with find_element inside of it
    self.cmb_sort = driver.find_element(
      By.XPATH, r"//div[@class='uv-dropdown sort uv-dropdown-open']")
    self.link_ticket_req = driver.find_element(
      By.XPATH, r"//a[text()='Ticket Requests']")
    tmp_xpath = "/".join(
      r"//ul[@class='uv-nav-tab-label']",
      "li",
      r"a[@href='/en/customer/create-ticket/']"
    )
    self.link_new_ticket = driver.find_element(
      By.XPATH, tmp_xpath)
    self.txt_search_ticket = driver.find_element(
      By.CSS_SELECTOR, r"input[class='uv-search-inline uv-search-inline-full']")
    self.txt_search = driver.find_element(
      By.CSS_SELECTOR, r"input[class='uv-nav-search']")
