import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5001;
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js';
connectDB();

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/api/users',userRoutes);
app.use('/api/tasks',taskRoutes);
app.get('/',(req,res) =>res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);
app.listen(port,()=>console.log(`Server started on port ${port}`));