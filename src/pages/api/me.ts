import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateJWTuser } from "@/middlewares/authenticateJWT"; // Make sure to import your middleware correctly
import User from "@/models/User";
import { connect } from "mongoose";

const uri: string = process.env.MONGODB_URI || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Authenticate the user's JWT token
      authenticateJWTuser(req, res, async () => {

        await connect(uri);
        const userId = req.headers.userId;
        const user = await User.findById(userId)

        if (user) {
          res.status(200).json({
            name: user.name,
            profilePhoto: user.profilePhoto,
            email: user.email,
            phoneNo: user.phoneNo,
            about: user.about,
            skills: user.skills,
            professionalDetail: user.professionalDetail,
            certifications: user.certifications,
            experiences: user.experiences,
            education: user.education,
            connections: user.connections,
          });
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
