// authServices.ts

import { verifyUser } from "../repositories/auth/login.js";

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

export default { verifyUser };
