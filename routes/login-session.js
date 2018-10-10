"use strict"

var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var message = require('../const/message');
var db = require('../utils/db');

router.post('/login', async function (req, res, next) {
    let sess = req.session;

    let receivedUserId = req.body.id;
    let receivedUserPassword = req.body.password;

    console.log(req.body);

    if (!receivedUserId || !receivedUserPassword)
        return next(createError(400, "ID와 Password는 필수 입니다."));

    try {
        sess.userId = null;
        let rows = await db.query(sql.sql_select_user_by_id, receivedUserId);

        if (rows.length == 0) {
            return next(createError(401, '해당 사용자를 찾을 수 없습니다.'));
        }

        let userId = rows[0]['userid'];
        let userPassword = rows[0]['pwd'];

        if (userPassword !== receivedUserPassword) {
            return next(createError(401, '패스워드가 일치하지 않습니다.'));
        }

        //로그인 상태 저장
        sess.userId = receivedUserId;
        sess.userInfo = rows[0];
        res.send("정상적으로 로그인 되었습니다.");

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

router.post('/check', function (req, res, next) {
    let userId = req.session.userId;
    if (!userId) {
        return next(createError(401, '인증되어있지 않습니다.'));
    } else {
        return res.send(userId);
    }
});

module.exports = router;