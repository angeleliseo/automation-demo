import locator_page, locator_login, locator_board

class Locators(object):

  def __init__(self, driver):
    self.page_locators = locator_page.LocatorPage(driver)
    self.login_locators = locator_login.LocatorLogin(driver)
    self.board_locators = locator_board.LocatorBoard(driver)