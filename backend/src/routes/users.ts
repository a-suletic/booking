import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(400).json({ message: 'User already exists' });
		}
		user = new User(req.body);
		await user.save();

		// Create JWT token and set it as an HTTP-only cookie
		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET_KEY as string,
			{
				expiresIn: '1d',
			}
		);

		res.cookie('auth_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production', // in production, use secure cookies https
			maxAge: 86400000,
		});
		return res.status(200).json({ message: 'User registered successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Something went wrong' });
	}
});

export default router;
