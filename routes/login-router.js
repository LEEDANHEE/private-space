"use strict"

let createError = require('http-errors');
let express = require('express');
let path = require('path');

let router = express.Router();

router.get('/', async function (req, res, next) {
    console.log('******************************');
    return res.sendFile(path.join(__dirname, '../views/', 'login.html'));
});


module.exports = router;