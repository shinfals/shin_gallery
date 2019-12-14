var mysql = require('mysql');
var express = require('express');
var router = express.Router();

var con = mysql.createConnection({
  host: 'my-site-db',
  user: 'root',
  password: 'root',
  database: 'my-site-db'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  //sql query add
  con.query('select * from member', function(error, results, fields){
    if (error) throw error;
    console.log(results);
    res.render('index', {
      title: 'Index',
      content: results
    });
  });
});

module.exports = router;
