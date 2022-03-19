const bcrypt = require('bcrypt')

exports.rejecthashPassword = (password) => {
 return new Promise((resolve, reject) => {
  bcrypt.genSalt(12, (err, salt) => {
   if (err) { reject(err) }
   bcrypt.hash(password, salt, (err, hash) => {
    if (err) { reject(err) } resolve(hash)
   })
  })
 })
}

exports.comparePassword = (password, hashed) => {
 return bcrypt.compare(password, hashed)
}
