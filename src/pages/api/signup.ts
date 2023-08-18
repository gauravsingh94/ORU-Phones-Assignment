import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt";
import User from '@/models/User';
import dotenv from "dotenv";
import {  connect } from "mongoose";
import { generateJWTuser } from '@/middlewares/authenticateJWT';
dotenv.config();

const uri: string = process.env.MONGODB_URI || "";


const saltRounds = 10;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userData = req.body;
    try {
      await connect(uri);
      const existingUser = await User.findOne({ email: userData.email });
        
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        const newUser = new User({ ...userData, password: hashedPassword });
        await newUser.save();
        const token = generateJWTuser(newUser._id);
        res.status(201).json({ message: "User created successfully",token:token });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}