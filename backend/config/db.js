//Require env file
const dotenv = require("dotenv");
dotenv.config();

//Connect to mongodb using mongoose
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //To remove warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("NOT CONNECTED TO DATABASE...")
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
