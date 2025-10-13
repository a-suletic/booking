import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

const app = express();
app.use(cookieParser());
app.use(express.json()); // Built-in body parser in Express. Covert the body of API request into JSON automatically, we don't have to do for each of our endpoints
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Specific origin for credentials
  credentials: true, // allow cookies to be sent
};

app.use(cors(corsOptions));

app.use('/api/users', userRoutes); // if request URL starts with /api/users, forward it to userRoutes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
