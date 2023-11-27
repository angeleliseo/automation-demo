import sys
sys.path.append("../tests")
from base_test import BaseTest


class TestCanary(BaseTest):

  def test_mycanary(self):
    logger = self.get_logger("canary_test")
    logger.info("Hello from canary")
    assert True == True
