"use strict";

var _require = require('@faker-js/faker'),
    faker = _require.faker;

var fs = require('fs');

function generateUsers() {
  var users = [];

  for (var id = 1; id <= 5; id++) {
    var name = faker.name.findName();
    var email = faker.internet.email();
    var password = faker.random.alphaNumeric(6); //let courses = faker.random.arrayElements(['car', 'dog', 'sas', 'fde', 'der'], 3)

    users.push({
      //"id": id,
      "name": name,
      "email": email,
      "password": password //"courses": courses

    });
  }

  return {
    users: users
  };
}

var dataObj = generateUsers();
fs.writeFileSync('c:/Users/moyo/OneDrive/Documents/Codes/Web/Javascript/Node/e-learning/server/helpers/data.json', JSON.stringify(dataObj, null, '\t'));