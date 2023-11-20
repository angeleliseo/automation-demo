# Dependencies
In order to be able to work with the functional automation for this project the following software is required: 

### Programming Language

Python 3 was chosen to used for being easy to learn, flexible to use on different scenarios such automation testing, infrastructure automation and ML.

First this has to be installed in the developer sandbox from the [official page](https://www.python.org/downloads/) and added to environment variables.

![[python_path.png]]

### Modules and Dependency Manger

To facilitate the management of dependencies the PIP dependency manager will be used in this project. 

To review which version is installed check with the following command: 

~~~shell
python3 -m pip --version
~~~

or

~~~shell
py -m pip --version
~~~

#### Virtual Environments

Virtual environments are going to be used in the project to handle the dependencies in the sandbox without breaking other future or existing projects dependencies.

Make sure you have installed virtualenv or else install it by the following command:

~~~shell
pip install virtualenv
~~~

### Improve Debugging

In order to improve the debugging process an alternative python console will be installed:

~~~shell
pip install ipython
~~~

This will support with auto complete options on python console or accepting code changes without leaving the console.

