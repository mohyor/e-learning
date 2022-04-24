"use strict";

var mongoose = require('mongoose');

require("dotenv").config();

var users = require('./users.js');

var reviews = require('./reviews.js');

var User = require('../models/user.js');

var Review = require('../models/review.js');

mongoose.connect("mongodb://localhost:27017/finalyrproj", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('DB CONNECTED');
})["catch"](function (err) {
  return console.log("DB CONNECTION ERR =>", err);
});

var importData = function importData() {
  return regeneratorRuntime.async(function importData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.insertMany(users));

        case 3:
          //await Review.insertMany(reviews)
          console.log('Data Imported!');
          process.exit();
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("".concat(_context.t0));
          process.exit(1);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

importData();