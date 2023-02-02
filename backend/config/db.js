// import mongoose from "mongoose";
const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb được kết nối với máy chủ: ${data.connection.host}`);
    })
    .catch(() => console.log("Couldn't connect to database!"))
}

// export default connectDB
module.exports = connectDB;