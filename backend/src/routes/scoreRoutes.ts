import express from 'express';
import { getScores, saveGame, getHighscores } from '../repositories/game/scores.js';

const scoreRoutes = express.Router();

scoreRoutes.get('/:duration', async (req, res) => {
  const { duration } = req.params;

  try {
    const scores = await getScores(parseInt(duration, 10));
    return res.json(scores);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

scoreRoutes.get('/highscores/:duration/:limit', async (req, res) => {
  const { duration, limit } = req.params;

  try {
    const highscores = await getHighscores(parseInt(duration, 10), parseInt(limit, 10));
    return res.json(highscores);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

scoreRoutes.post('/save-game', async (req, res) => {
  const { userId, score, durationId, regionId } = req.body;

  if (!userId || !score || !durationId || !regionId) {
    return res.status(400).json({ error: 'User ID, score, duration ID, and region ID are required.' });
  }

  try {
    await saveGame(userId, score, durationId, regionId);
    return res.json({ message: 'Game saved successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

export { scoreRoutes };
