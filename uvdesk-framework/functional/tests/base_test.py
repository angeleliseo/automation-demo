import pytest
import logging
import logging.config

@pytest.mark.usefixtures("class_setup")
class BaseTest:

  def get_logger(self, logger_name):
    #Pending to append date and time in the file name
    logging.config.fileConfig(
      '../utils/logging.conf' ,
      disable_existing_loggers=False,
      defaults={ 'logfilename' : '../logs/uvdesk_execution.log' } )
    # create logger
    logger = logging.getLogger(logger_name)
    return logger