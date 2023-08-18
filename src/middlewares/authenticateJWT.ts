import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import type { NextApiRequest, NextApiResponse } from "next";

const userSecret = process.env.SECRET!;

export const generateJWTuser = (id: string) => {
  const payload = { id };
  return jwt.sign(payload, userSecret);
};

export const authenticateJWTuser = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, userSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (err) {
      res.status(403).json({ error: err });
    }
    if (!decoded || typeof decoded === "string") {
      return res.status(403);
    }
    req.headers["userId"] = decoded.id;
    next();
  });
};