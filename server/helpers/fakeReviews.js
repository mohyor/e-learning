const { faker } = require('@faker-js/faker');
const fs = require('fs')

function generateReviews() {

 let reviews = []

 const courseObject = { "$oid": "62414201b28d80ff20172fe7" };
 const courseObject2 = { "$oid": "62414353b28d80ff20172feb" };
 const courseObject3 = { "$oid": "62414655817647df4ab0ba2a" };
 const courseObject4 = { "$oid": "62417498817647df4ab0ba48" };
 const courseObject5 = { "$oid": "62458218569e0aeca6d5645a" };
 const courseObject6 = { "$oid": "62458325569e0aeca6d5645e" };
 const courseObject7 = { "$oid": "62458462569e0aeca6d56465" };
 const courseObject8 = { "$oid": "624585f9569e0aeca6d5646e" };
 const courseObject9 = { "$oid": "62458825569e0aeca6d56472" };
 const courseObject10 = { "$oid": "624588cb569e0aeca6d56479" };
 const courseObject11 = { "$oid": "62603428e8c507e186ea4f88" };
 const courseObject12 = { "$oid": "6260350ae8c507e186ea4f8c" };
 const courseObject13 = { "$oid": "6260395de8c507e186ea4f90" };
 const courseObject14 = { "$oid": "62603aaee8c507e186ea4f94" };
 const courseObject15 = { "$oid": "62604da6e8c507e186ea4fa5" };
 const courseObject16 = { "$oid": "62604f38e8c507e186ea4fa9" };
 const courseObject17 = { "$oid": "62604febe8c507e186ea4fad" };
 const courseObject18 = { "$oid": "6260521de8c507e186ea4fb1" };
 const courseObject19 = { "$oid": "62605305e8c507e186ea4fb5" };
 const courseObject20 = { "$oid": "62605550e8c507e186ea4fb9" };
 const courseObject21 = { "$oid": "626056bee8c507e186ea4fc1" };
 const courseObject22 = { "$oid": "626057e2e8c507e186ea4fc5" };
 const courseObject23 = { "$oid": "6260595be8c507e186ea4fca" };
 const courseObject24 = { "$oid": "62605b52e8c507e186ea4fce" };
 const courseObject25 = { "$oid": "62605c59e8c507e186ea4fd2" };
 const courseObject26 = { "$oid": "62605d5be8c507e186ea4fd6" };
 const courseObject27 = { "$oid": "62605dfae8c507e186ea4fda" };
 const courseObject28 = { "$oid": "62605f1be8c507e186ea4fde" };
 const courseObject29 = { "$oid": "62606030e8c507e186ea4fe4" };
 const courseObject30 = { "$oid": "6260614ce8c507e186ea4fe8" };
 const courseObject31 = { "$oid": "6260627ae8c507e186ea4fec" };
 const courseObject32 = { "$oid": "62606332e8c507e186ea4ff0" };
 const courseObject33 = { "$oid": "626063c0e8c507e186ea4ff4" };
 const courseObject34 = { "$oid": "626064aee8c507e186ea4ff8" };

 const courseObject34 = { "$oid": "626064aee8c507e186ea4ff8" };

 for (let id=1; id <= 2; id++) {
  let comment = faker.lorem.text();
  let rating = faker.datatype.float({ min: 0.5, max: 5.0, precision: 0.5 })
  //let course = faker.random.arrayElement([{ "$oid": "62414353b28d80ff20172feb" }], [{ "$oid": "624588cb569e0aeca6d56479" }], [{ "$oid": "62458325569e0aeca6d5645e" }])
  let course = faker.random.arrayElement([courseObject, courseObject2, courseObject3, courseObject4, courseObject5, courseObject6, courseObject7, courseObject8, courseObject9, courseObject10, 
   courseObject11, courseObject12, courseObject13, courseObject14, courseObject15, courseObject16, courseObject17, courseObject18, courseObject19, courseObject20, courseObject21, courseObject22, courseObject23, courseObject24, courseObject25, courseObject26, courseObject27, 
   courseObject28, courseObject29, courseObject30, courseObject31, courseObject32, courseObject33, courseObject34])
  let user = faker.random.arrayElement([{ "$oid": "62414353b28d80ff20172feb" }])

 reviews.push({ "comment": comment, "rating": rating, "course": course, "user": user });
 }
 return { reviews }
}

let dataObj = generateReviews();

fs.writeFileSync('c:/Users/moyo/OneDrive/Documents/Codes/Web/Javascript/Node/e-learning/server/helpers/reviews.json', JSON.stringify(dataObj, null, '\t'));
