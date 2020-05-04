const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//mongoose.connect(db); //this will give us a promise, however there is a new standard for handling promises and is sync await
//whenever its used a async await is good to do it in a try catch block
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });
    console.log("Mongodb connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // exit process with failure
  }
};
/*
const connectDB = () => {
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => {
      console.error(err.message);
      process.exit(1); // exit process with failure
    });
};
*/
module.exports = connectDB;
