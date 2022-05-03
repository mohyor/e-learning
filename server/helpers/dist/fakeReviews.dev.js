"use strict";

var _require = require('@faker-js/faker'),
    faker = _require.faker;

var fs = require('fs');

function generateReviews() {
  var reviews = [];
  var object = {
    "$oid": "62414201b28d80ff20172fe7"
  };
  var object2 = {
    "$oid": "62414353b28d80ff20172feb"
  };
  var object3 = {
    "$oid": "62414655817647df4ab0ba2a"
  };
  var object4 = {
    "$oid": "62417498817647df4ab0ba48"
  };
  var object5 = {
    "$oid": "62458218569e0aeca6d5645a"
  };
  var object6 = {
    "$oid": "62458325569e0aeca6d5645e"
  };
  var object7 = {
    "$oid": "62458462569e0aeca6d56465"
  };
  var object8 = {
    "$oid": "624585f9569e0aeca6d5646e"
  };
  var object9 = {
    "$oid": "62458825569e0aeca6d56472"
  };
  var object10 = {
    "$oid": "624588cb569e0aeca6d56479"
  };
  var object11 = {
    "$oid": "62603428e8c507e186ea4f88"
  };
  var object12 = {
    "$oid": "6260350ae8c507e186ea4f8c"
  };
  var object13 = {
    "$oid": "6260395de8c507e186ea4f90"
  };
  var object14 = {
    "$oid": "62603aaee8c507e186ea4f94"
  };
  var object15 = {
    "$oid": "62604da6e8c507e186ea4fa5"
  };
  var object16 = {
    "$oid": "62604f38e8c507e186ea4fa9"
  };
  var object17 = {
    "$oid": "62604febe8c507e186ea4fad"
  };
  var object18 = {
    "$oid": "6260521de8c507e186ea4fb1"
  };
  var object19 = {
    "$oid": "62605305e8c507e186ea4fb5"
  };
  var object20 = {
    "$oid": "62605550e8c507e186ea4fb9"
  };
  var object21 = {
    "$oid": "626056bee8c507e186ea4fc1"
  };
  var object22 = {
    "$oid": "626057e2e8c507e186ea4fc5"
  };
  var object23 = {
    "$oid": "6260595be8c507e186ea4fca"
  };
  var object24 = {
    "$oid": "62605b52e8c507e186ea4fce"
  };
  var object25 = {
    "$oid": "62605c59e8c507e186ea4fd2"
  };
  var object26 = {
    "$oid": "62605d5be8c507e186ea4fd6"
  };
  var object27 = {
    "$oid": "62605dfae8c507e186ea4fda"
  };
  var object28 = {
    "$oid": "62605f1be8c507e186ea4fde"
  };
  var object29 = {
    "$oid": "62606030e8c507e186ea4fe4"
  };
  var object30 = {
    "$oid": "6260614ce8c507e186ea4fe8"
  };
  var object31 = {
    "$oid": "6260627ae8c507e186ea4fec"
  };
  var object32 = {
    "$oid": "62606332e8c507e186ea4ff0"
  };
  var object33 = {
    "$oid": "626063c0e8c507e186ea4ff4"
  };
  var object34 = {
    "$oid": "626064aee8c507e186ea4ff8"
  };

  for (var id = 1; id <= 2; id++) {
    var comment = faker.lorem.text();
    var rating = faker.datatype["float"]({
      min: 0.5,
      max: 5.0,
      precision: 0.5
    }); //let course = faker.random.arrayElement([{ "$oid": "62414353b28d80ff20172feb" }], [{ "$oid": "624588cb569e0aeca6d56479" }], [{ "$oid": "62458325569e0aeca6d5645e" }])

    var course = faker.random.arrayElement([object, object2, object3, object4, object5, object6, object7, object8, object9, object10, object11, object12, object13, object14, object15, object16, object17, object18, object19, object20, object21, object22, object23, object24, object25, object26, object27, object28, object29, object30, object31, object32, object33, object34], 4);
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