const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const bcryptSalt = 10;

mongoose
  .connect('mongodb+srv://juan:1234@cluster0-wmdlg.mongodb.net/Final-Project?retryWrites=true&w=majority', {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})