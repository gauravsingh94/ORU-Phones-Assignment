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
  if (req.method === "DELETE") {
    try {
      authenticateJWTuser(req, res, async () => {
        await connect(uri);
        const userId = req.headers.userId;
        const user = await User.findById(userId);
        if (user) {
          if (typeof req.headers._id === "string") {
            const connectionId: string = req.headers._id;
            // Convert the connectionId to mongoose.Types.ObjectId
            const connectionObjectId = new Types.ObjectId(connectionId);

            const isConnected: boolean = user.connections.some(
              (connection: { user: mongoose.Types.ObjectId }) =>
                connection.user.toString() === connectionObjectId.toString()
            );

            if (!isConnected) {
              res.status(400).json({ message: "Not connected" });
              return;
            }

            user.connections = user.connections.filter(
              (connection: { user: mongoose.Types.ObjectId }) =>
                connection.user.toString() !== connectionObjectId.toString()
            );

            await user.save();

            res
              .status(200)
              .json({ message: "Connection removed successfully" });
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
