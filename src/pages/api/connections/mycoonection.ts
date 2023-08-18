import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateJWTuser } from "@/middlewares/authenticateJWT";
import User, { IUser } from "@/models/User"; // Assuming you've exported IUser from the models/User module
import { connect } from "mongoose";

const uri: string = process.env.MONGODB_URI || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      authenticateJWTuser(req, res, async () => {
        await connect(uri);
        const userId = req.headers.userId;
        console.log("Retrieving user connections for userId:", userId);

        const user = await User.findById(userId).populate('connections.user');

        if (user) {
          const connections = user.connections.map((connection: { user: IUser }) => {
            return {
              userId: connection.user._id,
              name: connection.user.name,
              about: connection.user.about,
              profilePhoto: connection.user.profilePhoto,
            };
          });

          res.status(200).json({ connections });
        } else {
          console.log("User not found.");
          res.json({ error: "User not found." });
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
