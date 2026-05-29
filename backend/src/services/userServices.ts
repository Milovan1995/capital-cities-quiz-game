import { IFeedback, IUserProfile, IUserStats } from "../dao/ITables.js";
import {
  getUserFeedback,
  getUserGameStatsByUsername,
  getUserProfileByUsername,
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

const getCurrentUserProfile = async (username: string) => {
  const user: IUserProfile | undefined = await getUserProfileByUsername(
    username
  );
  return user;
};

const getCurrentUserStats = async (username: string) => {
  const stats: IUserStats | undefined = await getUserGameStatsByUsername(
    username
  );
  return stats;
};

export default {
  insertNewUserFeedback,
  readFeedbackFromUsers,
  getCurrentUserProfile,
  getCurrentUserStats,
};
