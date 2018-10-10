let createError = require('http-errors');
let express = require('express');
let sess = require('express-session');
let router = express.Router();

router.all('/*', function (req, res, next) {
    sess = req.session;

    if (!sess.userId) {
        return next(createError(401, '인증되지않았습니다.'));
    }

    next('route');
});

module.exports = router;