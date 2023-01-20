import { Router } from "express";
import { getGames, insertGame } from "../controllers/games.controller.js";
import { validateBody } from "../middlewares/bodyValidation.middleware.js";
import { gameSchema } from "../schemas/game.schema.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateBody(gameSchema), insertGame);
gamesRouter.get("/games", getGames);

export default gamesRouter;
