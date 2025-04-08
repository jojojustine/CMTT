import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Import the CORS middleware
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';  // Import connectDB function
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import morgan from 'morgan';
import contactRoutes from './routes/contactRoutes.js';


dotenv.config();  // Load environment variables from .env file

const port = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();  // Ensure MongoDB connection is established before starting the server

const app = express();
app.use(morgan('dev'));

// Enable CORS for the frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests only from frontend (localhost:3000)
  credentials: true,  // Allow cookies if needed
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/users/tasks', taskRoutes);
app.use('/api/users/groups', groupRoutes);
app.use('/api/contact', contactRoutes);
// Root route to check if the server is up
app.get('/', (req, res) => res.send('Server is ready'));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));
