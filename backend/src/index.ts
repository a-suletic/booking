import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import myHotelRoutes from './routes/my-hotels';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

// API routes MUST come before static file serving and wildcard routes
app.use('/api/users', userRoutes); // if request URL starts with /api/users, forward it to userRoutes
app.use('/api/auth', authRoutes);
app.use('/api/my-hotels', myHotelRoutes);

// build frontend app and dist folder will be created
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// This MUST be the last middleware
app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
