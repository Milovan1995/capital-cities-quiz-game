import { verifyUser } from "../repositories/auth/login.js";
import {
  checkUsernameExists,
  registerUser,
} from "../repositories/auth/registration.js";
import bcrypt from "bcrypt";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<boolean> => {
  try {
    const user = await verifyUser(username, password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  } catch (error) {
    throw new Error("Internal server error.");
  }
};

const checkIfUsernameExists = async (username: string) => {
  try {
    const usernameExists: boolean = await checkUsernameExists(username);
    return usernameExists;
  } catch (e) {
    throw new Error("Internal server error while checking username");
  }
};

const registerNewUser = async (username: string, password: string) => {
  try {
    const saltRounds: number = 10;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    const result = await registerUser(username, hashedPassword);
    return result;
  } catch (error) {
    throw new Error("Internal error while registering the user");
  }
};

export default { verifyUser, checkIfUsernameExists, registerNewUser };
