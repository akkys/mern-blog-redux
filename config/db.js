const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
