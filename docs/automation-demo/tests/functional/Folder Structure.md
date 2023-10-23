# Folder Structure

The proposed folder structure for the functional automation project will be:

~~~
project_name/
├─ pages/
│  ├─ home_page.py
│  ├─ base_page.py
├─ resources/
│  ├─ locators.py
├─ tests/
│  ├─ base_test.py
│  ├─ test_home_page.py
├─ drivers/
│  ├─ driver.exe
├─ reports/
│  ├─ report.html
│  ├─ report.xml
├─ utils/
│  ├─ ssh_client.py
│  ├─ csv_importer.py
├─ pytest.ini
├─ tox.ini
├─ make
├─ requirements.txt
~~~

---
### Folder Structure Details
Folder structure explanation in detail:

- **project_name**: Base folder where all the source files and non source files will be saved about the automation project. In this level also will include some key files that help the repo and framework on the setup.
- **pages**: Since POM design pattern was selected, this folder will host all the pages related objects that will help on the POM implementation, including base clases if required.
- **resources**: This folder will be used to expand the object repository, this can be useful to avoid over using the page classes with locators and just import the right resources when required.
- **tests**: The actual test cases classes and/or test base classes that will help on the POM implementation.
- **drivers**: Folder where the bin files for the webdrivers for selenium will be stored, this will be the most basic implementation in first iteration, but this will be changed on future to try to use a *driver_manager* instead. This folder has to be excluded (.gitingore) to be synced in Git to avoid storing bins in the repo.
- **reports**: Folder where reports for current execution (in debugging or development time) will be stored. Final reports are intended to be pushed on another repository in different tools such Graphana or kivana, for trend reports. This may include HTML or xml files.
- **utils**: This folder will be used to host python files that support on the testing as utilities, it is not necessary business requirement or framework requirement but help on the test process. For instance: ways to read data from sources, export data to specific formats, clients to get or post information such ssh, aws, azure, k8s or so

### Special files on the repo
- **pytest.ini**: File that will be used to configure pytest convinient configurations for the framework or test suites.
- **tox.ini**: File that will be used to configure some aspects of the tools used for the framework, such pycodestyle.
- **requirements.txt**: File that will be used to declare which are the dependencies of the project to be executed correctly (python libs used).
- **make**: File that will be used to simplify the execution of some commands (automations).