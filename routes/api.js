var express = require('express');
var router = express.Router();
var request = require('request');
var baseUrl = 'http://demo2.recurrex.com/';
var app_key = '9271837387576961055085871';
var app_secret = 'ra5bkuA5NSpr0oG4HIJ73FMwgWFjh9tlLMJRaeRuGWMl44yUiQ';

/* Register new user. */
router.post('/user/register', function(req, res, next) {
  var user = req.body;
  user.app_key = app_key;
  user.app_secret = app_secret;
  request.post(baseUrl + 'api/v1/user/register', {form: user}, function(err, httpResponse, body) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    request.post(baseUrl + 'api/v1/user/authenticate', {form: user}, function(err, httpResponse, body) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      res.send(httpResponse.body);
    });
  });
});

/* Login existing user. */
router.post('/user/login', function(req, res, next) {
  var user = req.body;
  user.app_key = app_key;
  user.app_secret = app_secret;
  request.post(baseUrl + 'api/v1/user/authenticate', {form: user}, function(err, httpResponse, body) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    res.send(httpResponse.body);
  });
});

/* Fetch all products. */
router.post('/products', function(req, res, next) {
  var auth = req.body;
  auth.app_key = app_key;
  auth.app_secret = app_secret;
  request.post(baseUrl + 'api/v1/product/public/list', {form: auth}, function(err, httpResponse, body) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    res.send(body);
  });
});

module.exports = router;
