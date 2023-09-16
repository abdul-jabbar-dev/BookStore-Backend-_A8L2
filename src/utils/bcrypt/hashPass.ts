import bcrypt from "bcrypt";
const hashPass = async (textPass: string) => {
  const hash = await bcrypt.hash(
    textPass,
    (process.env.SALT as unknown as number) * 1
  );
  return hash;
};

export const verifyPass = async (StoredPassword: string, UserPassword: string) => {
  const passwordVerified = await bcrypt.compare(UserPassword, StoredPassword);
  return passwordVerified;
};

export default hashPass;
