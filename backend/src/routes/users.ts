import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.post(
	'/register',
	[
		check('email')
			.notEmpty()
			.withMessage('Email is required')
			.isEmail()
			.withMessage('Email must be a valid email address'),
		check('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long'),
		check('firstName')
			.isString()
			.notEmpty()
			.withMessage('First name must be a string and is required'),
		check('lastName')
			.isString()
			.notEmpty()
			.withMessage('Last name must be a string and is required'),
	],
	async (req: Request, res: Response) => {
		try {
			// Check for validation errors
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res.status(400).json({ message: 'User already exists' });
			}
			user = new User(req.body);
			await user.save();

			// Check if JWT_SECRET_KEY exists
			if (!process.env.JWT_SECRET_KEY) {
				console.error('JWT_SECRET_KEY is not defined in environment variables');
				return res.status(500).json({ message: 'Server configuration error' });
			}

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
	}
);

export default router;
