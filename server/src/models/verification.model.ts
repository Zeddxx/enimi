import mongoose, { Schema } from "mongoose";

interface IVerification {
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

const VerificationSchema = new Schema<IVerification>({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: Date,
  expiresAt: Date,
});

export const verification = mongoose.model<IVerification>(
  "verification",
  VerificationSchema
);
