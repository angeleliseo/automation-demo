"""How To Log
This is a sample of how to write a module that consumes the configured
logging file available at: 'utils/' folder with the name 'logging.conf'
"""

import logging
import logging.config

logging.config.fileConfig('../utils/logging.conf')

# create logger
logger = logging.getLogger('my_module')


# 'application' code
logger.debug('debug message')
logger.info('info message')
logger.warning('warn message')
logger.error('error message')
logger.critical('critical message')