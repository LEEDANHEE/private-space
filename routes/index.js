var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'private space 민지 단희 사이트 ' });
});

module.exports = router;
