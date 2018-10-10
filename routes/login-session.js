"use strict"

let createError = require('http-errors');
let express = require('express');
let router = express.Router();
let path = require('path');

let db = require('../utils/db');
let userQuery = require('../query/user-query');

router.post('/login', async function (req, res, next) {
    let sess = req.session;

    let receivedUserId = req.body.userid;
    console.log('receivedUserId: ', receivedUserId);
    let receivedUserPassword = req.body.password;
    console.log('receivedUserPassword: ', receivedUserPassword);

    if (!receivedUserId || !receivedUserPassword)
        return next(createError(400, "ID와 Password는 필수 입니다."));

    try {
        sess.userId = null;
        let rows = await db.query(userQuery.SQL_SELECT_USER_BY_USERID, receivedUserId);

        if (rows.length == 0) {
            return next(createError(404, '해당 사용자를 찾을 수 없습니다.'));
        }

        let userId = rows[0]['userid'];
        let userPassword = rows[0]['password'];
        if (userPassword !== receivedUserPassword) {
            return next(createError(400, '패스워드가 일치하지 않습니다.'));
        }
        sess.userId = receivedUserId;
        sess.userInfo = rows[0];
        return res.send('정상적으로 로그인 되었습니다.');
    } catch (err) {
        return next(createError(500, err));
    }
});

router.post('/logout', function (req, res, next) {
    var sess = req.session;

    if (sess && sess.userId) {
        sess.destroy();
        res.clearCookie();
        return res.send("정상적으로 로그아웃 되었습니다.");
    } else {
        return next(createError(500, '관리자에게 문의해주세요.'));
    }
});

module.exports = router;