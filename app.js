let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let bodyParser = require('body-parser');

/* config */
let sessionConfig = require('./config/session-config');
/* middlewares */
let auth = require('./middlewares/auth');
/* router */
let loginRouter = require('./routes/login-router');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(session(sessionConfig));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
// app.use('/public/api/v1/login', loginApiRouter);
app.use(auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  let reqType = req.xhr ? 'AJAX' : 'HTTP';
  console.log('[ERROR(' + reqType + ')REQUEST PATH]: ' + req.originalUrl);

  if (req.xhr) {
    console.log(err);
    switch (err.status) {
      case '401':
        break;
      default:
        return res.status(err.status).json(err);
        break;
    }
  } else {
    console.log(err);
    switch (err.status) {
      case '401':
        return res.redirect(req.baseUrl + '/login');
        break;
      case '400':
        break;
      case '500':
        break;
      default:
        return res.status(err.status).json(err);
        break;
    }
  }
});

module.exports = app;