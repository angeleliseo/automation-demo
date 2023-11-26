"""_How to use locators in resources_
In order to use the 'resource/' folder which has per page locator python file
and then group all the locators in one single class 'Locators'.

This is the sample how to import and consume the Locator object.

"""
import sys
sys.path.append("../resources")
from resources.locators import Locators

locators = Locators()

#Locator object from page called "page" pointing to "name" resource in the page
#The sufix css stand for the locator type
name = locators.page_locators.name_css

print(name)