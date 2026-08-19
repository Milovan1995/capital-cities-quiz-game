import { Request, Response } from "express";
import { IAuthTokenPayload, IFeedback } from "../dao/ITables.js";
import userServices from "../services/userServices.js";

type AuthenticatedRequest = Request & { auth?: IAuthTokenPayload };

const insertNewUserFeedback = async (req: Request, res: Response) => {
  const auth = (req as AuthenticatedRequest).auth;
  const postedComment =
    typeof req.body.postedComment === "string"
      ? req.body.postedComment.trim()
      : "";

  if (!auth?.username || !postedComment || postedComment.length > 2000) {
    return res.status(400).json({
      error: "A comment between 1 and 2000 characters is required.",
    });
  }

  try {
    const isFeedbackInserted: boolean =
      await userServices.insertNewUserFeedback(auth.username, postedComment);
    if (isFeedbackInserted) {
      return res.json({ message: "Feedback saved successfully." });
    }
    return res.status(500).json({ error: "Internal server error." });
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

const readCurrentUser = async (req: Request, res: Response) => {
  const userData = (req as AuthenticatedRequest).auth;

  if (!userData?.username) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    const user = await userServices.getCurrentUserProfile(userData.username);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

const readCurrentUserStats = async (req: Request, res: Response) => {
  const userData = (req as AuthenticatedRequest).auth;

  if (!userData?.username) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    const stats = await userServices.getCurrentUserStats(userData.username);
    if (!stats) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.json({ stats });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export default {
  insertNewUserFeedback,
  readFeedbackFromUsers,
  readCurrentUser,
  readCurrentUserStats,
};
