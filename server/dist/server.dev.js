"use strict";

require("dotenv").config();

var mongoose = require("mongoose");

var express = require('express');

var cors = require('cors');

var csrf = require('csurf');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var userRoutes = require('./routes/user');

var instructorRoutes = require('./routes/instructor');

var courseRoutes = require('./routes/course');

var categoryRoutes = require('./routes/category');

var morgan = require('morgan'),
    app = express(),
    port = process.env.PORT || 4000,
    csrfProtection = csrf({
  cookie: true
});

mongoose.connect("mongodb://localhost:27017/finalyrproj", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('DB CONNECTED');
})["catch"](function (err) {
  return console.log("DB CONNECTION ERR =>", err);
}); // apply middlewares

app.use(cors());
app.use(express.json({
  limit: '5mb'
}));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api', userRoutes);
app.use('/api', instructorRoutes);
app.use('/api', courseRoutes);
app.use('/api', categoryRoutes);
app.use(cookieParser());
app.use(csrfProtection);
app.get('/api/csrf-token', function (req, res) {
  res.json({
    csrfToken: req.csrfToken()
  });
});
app.listen(port, function () {
  return console.log("Server is running on port ".concat(port));
});