var express = require('express');
var router = react.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

module.exports = router;
