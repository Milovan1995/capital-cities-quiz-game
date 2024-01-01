import { Request, Response } from "express";
import { IFeedback } from "../dao/ITables.js";
import userServices from "../services/userServices.js";

const insertNewUserFeedback = async (req: Request, res: Response) => {
  const { user, postedComment } = req.body;

  if (!user || !postedComment) {
    return res.status(400).json({ error: "User and comment are required." });
  }

  try {
    const isFeedbackInserted: boolean =
      await userServices.insertNewUserFeedback(user, postedComment);
    if (isFeedbackInserted) {
      return res.json({ message: "Feedback saved successfully." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
const readFeedbackFromUsers = async (req: Request, res: Response) => {
  const user = req.query.user as string | undefined;

  try {
    const feedback: IFeedback[] = await (!!user
      ? userServices.readFeedbackFromUsers(user)
      : userServices.readFeedbackFromUsers());
    return res.json({ feedback });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
export default {
  insertNewUserFeedback,
  readFeedbackFromUsers,
};
