import { Request, Response } from "express";
import {
  getUserFeedback,
  insertUserFeedback,
} from "../repositories/game/users.js";
import { IFeedback } from "../dao/ITables.js";

const insertNewUserFeedback = async (req: Request, res: Response) => {
  const { user, postedComment } = req.body;

  if (!user || !postedComment) {
    return res.status(400).json({ error: "User and comment are required." });
  }

  try {
    await insertUserFeedback(user, postedComment);
    return res.json({ message: "Feedback saved successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
const readFeedbackFromUsers = async (req: Request, res: Response) => {
  const user = req.query.user as string | undefined;

  try {
    let feedback: IFeedback[] = [];

    if (user) {
      // If 'user' is provided, fetch user-specific feedback
      feedback = await getUserFeedback(user);
    } else {
      // If 'user' is not provided, fetch all feedback
      feedback = await getUserFeedback();
    }

    return res.json({ feedback });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
export default {
  insertNewUserFeedback,
  readFeedbackFromUsers,
};
