"use strict";

var tf = require('@tensorflow/tfjs-node');

var courses = require("./ml/courses_data.json");

function loadModel() {
  return regeneratorRuntime.async(function loadModel$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Loading Model...');
          _context.next = 3;
          return regeneratorRuntime.awrap(tf.loadLayersModel("file:///home/dsn/personal/Tfjs/TensorFlowjs_Projects/recommender-sys/recommender-books/model/model.json", false));

        case 3:
          model = _context.sent;
          console.log('Model Loaded Successfull'); // model.summary()

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

var book_arr = tf.range(0, books.length);
var book_len = books.length;

exports.recommend = function recommend(userId) {
  var user, book_in_js_array, recommendations, i;
  return regeneratorRuntime.async(function recommend$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = tf.fill([book_len], Number(userId));
          book_in_js_array = book_arr.arraySync();
          _context2.next = 4;
          return regeneratorRuntime.awrap(loadModel());

        case 4:
          console.log("Recommending for User: ".concat(userId));
          _context2.next = 7;
          return regeneratorRuntime.awrap(model.predict([book_arr, user]).reshape([10000]));

        case 7:
          pred_tensor = _context2.sent;
          pred = pred_tensor.arraySync();
          recommendations = [];

          for (i = 0; i < 6; i++) {
            max = pred_tensor.argMax().arraySync();
            recommendations.push(books[max]); //Push book with highest prediction probability

            pred.splice(max, 1); //drop from array

            pred_tensor = tf.tensor(pred); //create a new tensor
          }

          return _context2.abrupt("return", recommendations);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};