import { IFeedback } from "../dao/ITables.js";
import {
  getUserFeedback,
  insertUserFeedback,
} from "../repositories/game/users.js";

const insertNewUserFeedback = async (user: string, comment: string) => {
  try {
    await insertUserFeedback(user, comment);
    return true;
  } catch (e) {
    throw new Error("Internal server error while inserting feedback");
  }
};
const readFeedbackFromUsers = async (user?: string) => {
  const data: IFeedback[] = await (user
    ? getUserFeedback(user)
    : getUserFeedback());
  return data;
};
export default { insertNewUserFeedback, readFeedbackFromUsers };
