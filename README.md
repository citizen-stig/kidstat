




Heroku
======

```
heroku addons:create mongolab:sandbox
heroku config:set FLASK_SETTINGS=heroku
heroku config:set FLASK_SECRET_KEY=some_secret
heroku config:set FLASK_PASSWORD_SALT=some_salt
```