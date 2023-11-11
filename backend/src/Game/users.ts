import { IUser } from "../dao/ITables.js";
import { insertIntoDb } from "../dao/create.util.js";

async function saveUserInfo(username: string, password: string) {
  const user: IUser = {
    username: username,
    password: password,
  };
  try {
    insertIntoDb(user, "users");
  } catch (err) {
    console.error(err, "Error saving user info.");
  }
}

export { saveUserInfo };
