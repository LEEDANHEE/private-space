"use strict"

let createError = require('http-errors');
let express = require('express');
let path = require('path');

let router = express.Router();

let db = require('../utils/db');
let postQuery = require('../query/post-query');

let stringUtil = require('../utils/string-util');

/**
 * get post list 
 */
router.get('/', async function (req, res, next) {
    let searchKeyword = req.query.q;
    // console.log('searchKeyword: ', searchKeyword);
    let limit = req.query.limit;
    // console.log('limit: ', limit);
    let order = req.query.order;
    // console.log('order: ', order);

    let whereQuery = '';
    if(searchKeyword){
        whereQuery += ' WHERE post.title LIKE \''+stringUtil.wrap(searchKeyword, '%')+'\' OR tag.name LIKE \''+stringUtil.wrap(searchKeyword, '%')+'\'';
    }
    if(order){
        whereQuery += ' ORDER BY '+order+ ' DESC';
    }
    if(limit){
        whereQuery += ' LIMIT '+Number(limit);
    }
    
    let query = postQuery.SQL_SELECT_POST+whereQuery;
    console.log('query: ', query);
    let rows = db.query(query);
    return res.json(rows);

});

module.exports = router;