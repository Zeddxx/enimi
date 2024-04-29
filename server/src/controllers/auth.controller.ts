import { Request, Response } from "express";
import { hashedValues } from "../lib/utils";
import User from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const hashedPassword = await hashedValues(password);

    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser) {
      return res.status(500).json({ message: "Something went wrong!" });
    }

    if (existingUsername) {
      return res.status(500).json({ message: "Username already taken!" });
    }

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    newUser.save();

    return res.status(200).json({ username, email, password, hashedPassword });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
