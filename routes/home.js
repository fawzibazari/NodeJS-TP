var express = require('express');
var router = express.Router();
var test = require('../cont');



// var test = [
//     {
//         "id": 1,
//         "username": "test1",
//         "mail": "test1",
//         "phone": "0102030405"
//     },{
//         "id": 2,
//         "username": "test2",
//         "mail": "test2",
//         "phone": "5040302010"
//     },{
//         "id": 3,
//         "username": "test3",
//         "mail": "test3",
//         "phone": "1020304050"
//     }
// ]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/Home/home', { title: 'Express',test:test });
});

module.exports = router ;



