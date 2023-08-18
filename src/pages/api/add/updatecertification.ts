import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateJWTuser } from "@/middlewares/authenticateJWT"; // Make sure to import your middleware correctly
import User from "@/models/User";
import { connect } from "mongoose";

const uri: string = process.env.MONGODB_URI || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      
      authenticateJWTuser(req, res, async () => {

        await connect(uri);
        const userId = req.headers.userId;
        const user = await User.findById(userId)

        if (user) {
        const newCertificate = {
            title:req.body.title,
            organization:req.body.organization
        }
          user.certifications.push(newCertificate);
          await user.save();
          res.json({message:"certificate  added successfully."})
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




