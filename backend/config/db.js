import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Ensure this is at the very top of your file
dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI); // Debug print to ensure MONGO_URI is loaded

const connectDB = async () => {
  try {
    // Ensure the MONGO_URI is available
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection Error:');
    console.error(`Error Name: ${error.name}`);
    console.error(`Error Message: ${error.message}`);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

export default connectDB;
