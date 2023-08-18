import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateJWTuser } from "@/middlewares/authenticateJWT";
import User from "@/models/User";
import { connect } from "mongoose";
import mongoose, { Types } from "mongoose";

const uri: string = process.env.MONGODB_URI || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      authenticateJWTuser(req, res, async () => {
        await connect(uri);
        const userId = req.headers.userId;
        const user = await User.findById(userId);
        if (user) {
          const connectionId: string = req.body._id;

          // Convert the connectionId to mongoose.Types.ObjectId
          const connectionObjectId = new Types.ObjectId(connectionId);

          const isAlreadyConnected: boolean = user.connections.some(
            (connection: { user: mongoose.Types.ObjectId }) =>
              connection.user.toString() === connectionObjectId.toString()
          );

          if (isAlreadyConnected) {
            res.status(400).json({ message: "Already connected" });
            return;
          }

          user.connections.push({ user: connectionObjectId });
          await user.save();

          res.status(200).json({ message: "Connected successfully" });
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
