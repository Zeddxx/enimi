import bcrypt from "bcryptjs";

export const hashedValues = async (value: string) => {
  const saltValue = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(value, saltValue);
  return hashedString;
};
