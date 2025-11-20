import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Event handler for successful connection
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    // Get URI and project name
    let mongodbURI = process.env.MONGODB_URI;
    const projectName = 'ResumeBuilder';

    // Check if URI is set
    if (!mongodbURI) {
      throw new Error("MONGODB_URI environment variable not set");
    }

    // Connect to MongoDB
    await mongoose.connect(`${mongodbURI}/${projectName}`);

    // can put additional connection checks or logging here if needed

  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

export default connectDB;
