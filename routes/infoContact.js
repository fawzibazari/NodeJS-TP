var express = require('express');
var router = express.Router();
var test = require('../cont');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    id = req.params.id 

    res.render('pages/Home/infoContact', { title: 'Express',id:id,test:test });
});

module.exports = router;
