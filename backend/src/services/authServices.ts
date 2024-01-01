import { verifyUser } from "../repositories/auth/login.js";
import {
  checkUsernameExists,
  registerUser,
} from "../repositories/auth/registration.js";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<boolean> => {
  try {
    const isUserValid = await verifyUser(username, password);
    return isUserValid;
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
    await registerUser(username, password);
    return true;
  } catch (error) {
    throw new Error("Internal error while registering the user");
  }
};

export default { verifyUser, checkIfUsernameExists, registerNewUser };
