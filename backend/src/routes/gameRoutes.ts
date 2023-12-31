import { Request, Response } from "express";
import express from "express";
import { getCapitals } from "../repositories/game/capitals.js";
import { ICapital } from "../dao/ITables.js";
import gameControllers from "../controllers/gameControllers.js";

const gameRoutes = express.Router();

gameRoutes.get("/capitals/:regionId?", gameControllers.getCapitals);

export { gameRoutes };
