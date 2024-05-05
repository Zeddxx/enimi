import { Request, Response } from "express";
import {
  comparehashedString,
  hashedValues,
  sendEmailVerification,
} from "../lib/utils";
import User from "../models/user.model";
import { verification } from "../models/verification.model";
import jwt from "jsonwebtoken";

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
      return res.status(500).json({ message: "User already exists!" });
    }

    if (existingUsername) {
      return res.status(500).json({ message: "Username already taken!" });
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    sendEmailVerification(user, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

/**
 * Verify email route functionality!
 */
export const verifyEmail = async (req: Request, res: Response) => {
  const { userId, token } = req.params;

  try {
    const result = await verification.findOne({ userId });

    if (result) {
      const { expiresAt, token: hashedToken } = result;

      // to check if token is expired or not!
      if (expiresAt.getTime() < Date.now()) {
        verification.findByIdAndDelete({ userId }).then(() => {
          User.findOneAndDelete({ _id: userId })
            .then(() => {
              const message: string = "Verification token expired.";
              return res.redirect(
                `${process.env.APP_URL}/verify?status=error&message=${message}`
              );
            })
            .catch((error) => {
              console.log(error);
              return res.redirect(
                `${process.env.APP_URL}/verify?status=error&message=something went wrong`
              );
            });
        });
      } else {
        comparehashedString(token, hashedToken)
          .then((isMatch) => {
            if (isMatch) {
              User.findOneAndUpdate({ _id: userId }, { verified: true }).then(
                () => {
                  verification
                    .findOneAndDelete({ userId })
                    .then(() => {
                      const message: string = "email verified successfully";
                      return res.redirect(
                        `${process.env.APP_URL}/verify?status=success&message=${message}`
                      );
                    })
                    .catch((error) => {
                      console.log(error);
                      const message: string =
                        "verification failed or link is expired.";
                      return res.redirect(
                        `${process.env.APP_URL}/verify?status=error&message=${message}`
                      );
                    });
                }
              );
            } else {
              const message: string =
                "verification failed or invalid verification link.";
              return res.redirect(
                `${process.env.APP_URL}/verify?status=error&message=${message}`
              );
            }
          })
          .catch((error) => {
            console.log(error);
            return res.redirect(
              `${process.env.APP_URL}/verify?status=error&message=something went wrong`
            );
          });
      }
    } else {
      const message: string = "Invalid verification link. try again later.";
      return res.redirect(
        `${process.env.APP_URL}/verify?status=error&message=${message}`
      );
    }
  } catch (error) {
    return res.redirect(`${process.env.APP_URL}/verify?message=`);
  }
};

/**
 * Login with email and password route controller.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "Invalid credentials fields!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    if (!user.verified) {
      return res
        .status(401)
        .json({ message: "Please check your email and verify." });
    }

    const { password: hashedPassword } = user;

    const match = await comparehashedString(password, hashedPassword);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        _id: user._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("enimi_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return res.status(201).json({ message: "Logged in!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("enimi_auth", "", {
      expires: new Date(0),
    });
    return res.send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
