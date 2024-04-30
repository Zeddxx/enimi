import bcrypt from "bcryptjs";
import { SendMailOptions, createTransport } from "nodemailer";
import { IUser } from "../types/auth.types";
import { v4 as uuidv4 } from "uuid";
import { Response } from "express";
import { verification } from "../models/verification.model";

const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

export const hashedValues = async (value: string) => {
  const saltValue = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(value, saltValue);
  return hashedString;
};

const transporter = createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

export const sendEmailVerification = async (user: IUser, res: Response) => {
  const { _id, username, email } = user;
  const token = _id + uuidv4();

  const APP_URL =
    process.env.NODE_ENV === "production"
      ? "https://enimi.onrender.com"
      : "http://localhost:4000";

  const link = APP_URL + "/api/auth/verify/" + _id + "/" + token;

  const mailOptions: SendMailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Enimi: Verify your email to watch anime on enimi.",
    html: `<div
    style="
      position: relative;
      font-family: Arial, sans-serif;
      font-size: 20px;
      color: #333;
      background-color: #fff;
    "
  >
    <img
      style="
        position: absolute;
        opacity: 80%;
        height: 8rem;
        width: 100%;
        object-fit: cover;
      "
      src="https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFubmVyJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
      alt="enimi banner"
    />
    <div
      style="
        padding-top: 0rem;
        display: flex;
        flex-direction: column;
        align-items: start;
      "
    >
      <img
        style="z-index: 88; height: 7rem; width: 7rem; object-fit: contain"
        src="https://media.tenor.com/Gx6TY8TrQPwAAAAj/tails-sonic.gif"
        alt=""
      />
      <h1 style="color: hsl(16, 83%, 51%)">
        Please verify your email address.
      </h1>
    </div>
    <hr />
    <h4 style="text-align: start">Hello! ${username}</h4>
    <p style="text-align: start; width: 100%">
      Enimi wants a verification of your email so we can verify that its you!
      not someone else!
    </p>
    <p style="text-align: start;">
      Note: This link
      <span style="color: hsl(16, 83%, 51%); font-weight: bold"
        >expires in 1 hour.</span
      >
    </p>
    <a
      href="${link}"
      style="
        color: #fff;
        padding: 14px;
        text-decoration: none;
        background-color: orange;
        border-radius: 0.2rem;
        width: 100%;
        display: block;
        max-width: 16rem;
        text-align: center;
      "
      >Email Address</a
    >
    <div style="margin-top: 20px;">
      <h4 style="font-family: inherit; font-weight: 500; line-height: normal; margin: 0;">Best regards</h5>
      <h5 style="font-family: inherit; font-weight: 500; line-height: 2.5rem; margin: 0; color: #333333f5;">- Enimi (Anime Streaming Platform)</h5>
    </div>
  </div>`,
  };

  try {
    const hashedToken = await hashedValues(token);

    const newVerifiedEmail = await verification.create({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    if (newVerifiedEmail) {
      transporter
        .sendMail(mailOptions)
        .then(() => {
          return res.status(201).send({
            message: `Verification email has been sended to ${email}. Please check and verify your account!`,
          });
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({ message: "Something went wrong! dw" });
        });
    }
  } catch (error) {
    console.log(
      "Something went wrong while sending verification email!",
      error
    );
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const comparehashedString = async (
  unhashedString: string,
  hashedString: string
): Promise<Boolean> => {
  const isMatch: boolean = await bcrypt.compare(unhashedString, hashedString);
  return isMatch;
};
