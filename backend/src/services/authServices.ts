import { verifyUser } from "../repositories/auth/login.js";
import {
  checkUsernameExists,
  registerUser,
} from "../repositories/auth/registration.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authenticateUser = async (
  userName: string,
  password: string
): Promise<Record<string, string | boolean>> => {
  try {
    const isUserValid = await verifyUser(userName, password);
    if (isUserValid) {
      const token = jwt.sign(
        {
          username: userName,
          isAdmin: false,
        },
        "SECRET"
      );
      return { success: true, token };
    } else {
      return { success: false };
    }
  } catch (error) {
    throw new Error("Internal server error.");
  }
};

const checkIfUsernameExists = async (username: string) => {
  try {
    const usernameExists: boolean = await checkUsernameExists(username);
    return usernameExists;
  } catch (e) {
    throw new Error("Internal server error while checking username" + e);
  }
};

const registerNewUser = async (userName: string, password: string) => {
  try {
    const saltRounds: number = 10;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    const result = await registerUser(userName, hashedPassword);
    if (!!result.id) {
      const token = jwt.sign(
        {
          username: userName,
          isAdmin: false,
        },
        "SECRET"
      );
      return { success: true, token };
    }
  } catch (error) {
    throw new Error("Internal error while registering the user");
  }
};

export default { authenticateUser, checkIfUsernameExists, registerNewUser };
