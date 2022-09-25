:: Visit https://github.com/mars/create-react-app-buildpack for more information
::
:: * -------------------------- *

@echo OFF

:: Heroku login, please uncomment it if you do not login into heroku
call heroku login
:: Set remote heroku
call heroku git:remote -a loi-bai-hat
:: Set build pack
:: heroku buildpacks:set mars/create-react-app
:: Deploy to heroku
call git push heroku main
:: open site
call heroku open