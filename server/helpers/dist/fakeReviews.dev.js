"use strict";

var _require = require('@faker-js/faker'),
    faker = _require.faker;

var fs = require('fs');

function generateReviews() {
  var reviews = [];

  for (var id = 1; id <= 2; id++) {
    var comment = faker.lorem.text();
    var rating = faker.datatype["float"]({
      min: 0.5,
      max: 5.0,
      precision: 0.5
    });
    var course = faker.random.arrayElement([{
      "$oid": "62414353b28d80ff20172feb"
    }], [{
      "$oid": "624588cb569e0aeca6d56479"
    }], [{
      "$oid": "62458325569e0aeca6d5645e"
    }]);
    var user = faker.random.arrayElement([{
      "$oid": "62414353b28d80ff20172feb"
    }]);
    reviews.push({
      "comment": comment,
      "rating": rating,
      "course": course,
      "user": user
    });
  }

  return {
    reviews: reviews
  };
}

var dataObj = generateReviews();
fs.writeFileSync('c:/Users/moyo/OneDrive/Documents/Codes/Web/Javascript/Node/e-learning/server/helpers/reviews.json', JSON.stringify(dataObj, null, '\t'));