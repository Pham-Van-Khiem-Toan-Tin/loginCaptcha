const studentModel = require("./models/student");
const userModel = require("./models/user");
const test = async () => {
  const doc = new userModel({
    id: "khiem",
    email: "khiempham2001@gmail.com",
    age: 21,
    dateOfBirth: "27/12/2001",
    password: "27/12/2001",
  });
  await doc.save(() => {
   studentModel
    .create({
      _id: doc._id,
      class: "12A",
    })
    .then(() => {
      console.log("save true");
    })
    .catch((err) => {
      console.log(err);
    });
  });
  
};
module.exports = test;
