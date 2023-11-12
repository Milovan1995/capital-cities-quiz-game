import { IFeedback, IUser } from "../dao/ITables.js";
import { insertIntoDb } from "../dao/create.util.js";
import { readFromDb, readSingleValueFromTable } from "../dao/read.util.js";

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

async function insertUserFeedback(
  user: string,
  postedComment: string
): Promise<void> {
  try {
    const userId: number = await readSingleValueFromTable<number>(
      "id",
      { username: user },
      "users"
    );
    const datePosted: string = new Date().toISOString().split("T")[0];
    if (userId) {
      await insertIntoDb(
        {
          user_id: userId,
          comment: postedComment,
          date_created: datePosted,
        },
        "feedback"
      );
    } else {
      console.error("Error");
      throw new Error("Error saving feedback");
    }
  } catch (error) {
    console.error(error, "Error saving user feedback");
  }
}

export { saveUserInfo, insertUserFeedback };
