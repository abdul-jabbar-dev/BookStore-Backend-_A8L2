import db from "../../../db";
import { User, Credential } from "@prisma/client";
import { TSendData } from "../../../types/Response/sendResponse";
import hashPass, { verifyPass } from "../../../utils/bcrypt/hashPass";
import GenerateToken from "../../../utils/jwt/generateToken";
import config from "../../../config/config";
import { JwtPayload } from "jsonwebtoken";

export const CreateUserDB = async ({
  password,
  ...userInfo
}: User & Credential): Promise<User> => {
  let user: User | undefined;
  const session = await db.$transaction(async (prismaDb) => {
    user = await prismaDb.user.create({ data: userInfo }).catch((err) => {
      throw err;
    });
    if (!user) {
      throw new Error("User create failed");
    } else {
      const hashPassword = await hashPass(password);

      const setCredential = await prismaDb.credential.create({
        data: {
          email: user.email,
          password: hashPassword,
          userId: user.id,
          accessToken: GenerateToken(
            {
              email: user.email,
              role: user.role,
              id: user.id,
            },
            config.accessTokenExpire
          ),
          refreshToken: GenerateToken(
            {
              email: user.email,
              role: user.role,
              id: user.id,
            },
            config.refreshTokenExpire
          ),
        },
      });

      if (!setCredential) {
        throw new Error("User create failed with credential");
      }
    }
  });
  if (!user) {
    throw new Error("User create failed");
  } else {
    return user;
  }
};

export const GetUserDB = async (): Promise<TSendData<User[]>> => {
  const result: User[] = await db.user.findMany();
  return { data: result };
};

export const GetProfileDB = async (user: JwtPayload): Promise<User> => {
  const result = await db.user.findUnique({ where: { id: user.id } });
  if (!result) {
    throw new Error("User not found");
  } else {
    return result;
  }
};

export const GetAUserDB = async (id: string): Promise<User> => {
  const result: User | null = await db.user.findUnique({
    where: { id },
  });
  if (!result) {
    throw new Error("data not found");
  }
  return result;
};
export const UpdateUserDB = async (
  userData: Partial<Omit<User, "email">>,
  userId: string
) => {
  const update = await db.user.update({
    where: { id: userId },
    data: userData,
  });
  return update;
};
export const DeleteUserDB = async (id: string): Promise<User> => {
  let result;
  try {
    await db.$transaction(async (aDb) => {
      let cre = await aDb.credential
        .delete({ where: { userId: id } })
        .catch((err) => {
          throw err;
        });
      if (!cre) {
        throw new Error("User not remove");
      }
      result = await aDb.user.delete({ where: { id } });
    });

    if (!result) {
      throw new Error("User not remove");
    }
    return result;
  } catch (error) {
    throw error;
  }
};
export const ResetPasswordDB = async (
  userInfo: JwtPayload,
  newPassword: string,
  oldPassword: string
) => {
  const userCredential = await db.credential.findUnique({
    where: { userId: userInfo.id },
  });

  const isPasswordMatch = await verifyPass(
    userCredential?.password!,
    oldPassword
  );
  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  } else {
    const encodedPass = await hashPass(newPassword);
    if (!encodedPass) {
      throw new Error("Internal server error! Try again");
    } else {
      await db.credential
        .update({
          where: { userId: userInfo.id },
          data: { password: encodedPass },
        })
        .catch((err) => {
          throw err;
        });
    }
  }
};
export const LoginUserDB = async (data: {
  email: string;
  password: string;
}) => {
  const user: User | null = await db.user.findUnique({
    where: { email: data.email },
  });
  if (!user) {
    throw new Error("Invalid Email address");
  }
  const userCredential: Credential | null = await db.credential.findUnique({
    where: { userId: user.id },
  });
  if (!userCredential) {
    throw new Error("Internal server error");
  }

  const isPasswordMatch = verifyPass(userCredential.password, data.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid Password");
  }

  const updatedTokens = await db.credential.update({
    where: { userId: user.id },
    data: {
      accessToken: GenerateToken(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        config.accessTokenExpire
      ),
      refreshToken: GenerateToken(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        config.refreshTokenExpire
      ),
    },
  });
  if (!updatedTokens) {
    throw new Error("Internal server error");
  }
  return { ...updatedTokens, password: undefined };
};
