const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  try {

    await mongoose.connect(DATABASE_URL);

    console.log("Database connected successfully");

  } catch (error) {

    console.error("Error while connecting to database:", error.message);

    process.exit(1);
  }
};

module.exports = { connectDB };