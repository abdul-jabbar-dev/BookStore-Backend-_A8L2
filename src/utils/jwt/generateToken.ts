import jwt from "jsonwebtoken";

const GenerateToken = (
  data: { id: string; role: string; email: string },
  expiresIn: string
) => {
  const token = jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn });
  return token;
};
export default GenerateToken;
