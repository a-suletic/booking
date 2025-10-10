import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

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
app.use(express.json()); // Built-in body parser in Express. Covert the body of API request into JSON automatically, we don't have to do for each of our endpoints
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(cors());

app.get('/api/test', async (req: Request, res: Response) => {
	res.json({ message: 'Hello, from express endpoint!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
