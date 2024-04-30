import { Request, Response } from "express";
import User from "../models/user.model";

export const currentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-password')

    if (!user) {
      return res.status(400).json({ message: "Unauthorized!" });
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong!" });
  }
};
