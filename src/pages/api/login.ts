import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import { connect } from 'mongoose';
import { generateJWTuser } from '@/middlewares/authenticateJWT';

const uri: string = process.env.MONGODB_URI || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const loginData = req.body;
    try {
      await connect(uri);

      const existingUser = await User.findOne({ email: loginData.email });

      if (existingUser) {
        const passwordMatch = await bcrypt.compare(
          loginData.password,
          existingUser.password
        );

        if (passwordMatch) {
          const token = generateJWTuser(existingUser._id);
          res.status(200).json({ message: 'Login successful', token: token });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
