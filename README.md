KidStat
=======

It is a web application, that allows to check child growth parameters, 
based on [World Health Organization](http://www.who.int/childgrowth/standards/en/)s data.

It shows if measurement is low or high according to WHO standards.


Technologies
============

This application is built on top of these technologies:

* [Flask](http://flask.pocoo.org/) and [MongoDB](https://www.mongodb.com/) for server side
* [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/) for client side
* [Bootstrap](http://getbootstrap.com/) for styling


Heroku
======

What should be done for run this application in heroku

```
heroku addons:create mongolab:sandbox
heroku config:set FLASK_SETTINGS=heroku
heroku config:set FLASK_SECRET_KEY=some_secret
heroku config:set FLASK_PASSWORD_SALT=some_salt
```