"use strict";

var _require = require('@faker-js/faker'),
    faker = _require.faker;

var fs = require('fs');

function generateUsers() {
  var users = [];

  for (var id = 1; id <= 5000; id++) {
    var name = faker.name.findName();
    var email = faker.internet.email();
    var password = faker.random.alphaNumeric(6);
    var role = faker.random.arrayElements(["Subscriber"]);
    /*
    const object = { "$oid": "62414201b28d80ff20172fe7" };
    const object2 = { "$oid": "62414353b28d80ff20172feb" };
    const object3 = { "$oid": "62414655817647df4ab0ba2a" };
    const object4 = { "$oid": "62417498817647df4ab0ba48" };
    const object5 = { "$oid": "62458218569e0aeca6d5645a" };
    const object6 = { "$oid": "62458325569e0aeca6d5645e" };
    const object7 = { "$oid": "62458462569e0aeca6d56465" };
    const object8 = { "$oid": "624585f9569e0aeca6d5646e" };
    const object9 = { "$oid": "62458825569e0aeca6d56472" };
    const object10 = { "$oid": "624588cb569e0aeca6d56479" };
    const object11 = { "$oid": "62603428e8c507e186ea4f88" };
    const object12 = { "$oid": "6260350ae8c507e186ea4f8c" };
    const object13 = { "$oid": "6260395de8c507e186ea4f90" };
    const object14 = { "$oid": "62603aaee8c507e186ea4f94" };
    const object15 = { "$oid": "62604da6e8c507e186ea4fa5" };
    const object16 = { "$oid": "62604f38e8c507e186ea4fa9" };
    const object17 = { "$oid": "62604febe8c507e186ea4fad" };
    const object18 = { "$oid": "6260521de8c507e186ea4fb1" };
    const object19 = { "$oid": "62605305e8c507e186ea4fb5" };
    const object20 = { "$oid": "62605550e8c507e186ea4fb9" };
    const object21 = { "$oid": "626056bee8c507e186ea4fc1" };
    const object22 = { "$oid": "626057e2e8c507e186ea4fc5" };
    const object23 = { "$oid": "6260595be8c507e186ea4fca" };
    const object24 = { "$oid": "62605b52e8c507e186ea4fce" };
    const object25 = { "$oid": "62605c59e8c507e186ea4fd2" };
    const object26 = { "$oid": "62605d5be8c507e186ea4fd6" };
    const object27 = { "$oid": "62605dfae8c507e186ea4fda" };
    const object28 = { "$oid": "62605f1be8c507e186ea4fde" };
    const object29 = { "$oid": "62606030e8c507e186ea4fe4" };
    const object30 = { "$oid": "6260614ce8c507e186ea4fe8" };
    const object31 = { "$oid": "6260627ae8c507e186ea4fec" };
    const object32 = { "$oid": "62606332e8c507e186ea4ff0" };
    const object33 = { "$oid": "626063c0e8c507e186ea4ff4" };
    const object34 = { "$oid": "626064aee8c507e186ea4ff8" };
        let courses = faker.random.arrayElements([object, object2, object3, object4, object5, object6, object7, object8, object9, object10, 
      object11, object12, object13, object14, object15, object16, object17, object18, object19, object20, object21, object22, object23, object24, object25, object26, object27, 
      object28, object29, object30, object31, object32, object33, object34], 4)
    */

    users.push({
      "name": name,
      "email": email,
      "password": password,
      "role": role
      /*"courses": courses*/

    });
  }

  return {
    users: users
  };
}

var dataObj = generateUsers();
fs.writeFileSync('c:/Users/moyo/OneDrive/Documents/Codes/Web/Javascript/Node/e-learning/server/helpers/users.json', JSON.stringify(dataObj, null, '\t'));