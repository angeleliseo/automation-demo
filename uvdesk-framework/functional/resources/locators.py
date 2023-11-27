import locator_page, locator_login

class Locators(object):

  def __init__(self):
    self.page_locators = locator_page.LocatorPage()
    self.login_locators = locator_login.LocatorLogin()