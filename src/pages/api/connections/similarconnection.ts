import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateJWTuser } from "@/middlewares/authenticateJWT";
import User from "@/models/User";
import { connect } from "mongoose";
import mongoose from "mongoose";

const uri: string = process.env.MONGODB_URI || "";

interface Connection {
  user: mongoose.Types.ObjectId;
}

async function findSimilarProfiles(userId: string) {
  const requestingUser = await User.findById(userId);
  const similarProfiles = await User.find({
    _id: { $ne: userId },
    skills: { $in: requestingUser.skills },
  }).exec();

  const suggestedConnections = similarProfiles.filter((profile) => {
    const isConnected = requestingUser.connections.some(
      (connection: Connection) =>
        connection.user.toString() === profile._id.toString()
    );
    return !isConnected;
  });

  return suggestedConnections;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      authenticateJWTuser(req, res, async () => {
        await connect(uri);
        const userId = req.headers.userId;
        const user = await User.findById(userId);
        if (user) {
          if (typeof userId === "string") {
            const suggestedConnections = await findSimilarProfiles(userId);
            res.status(200).json({ suggestedConnections });
          } else {
            res.json({ error: "error occurs" });
          }
        } else {
          res.status(404).json({ message: "User not found" });
        }
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
