import express from "express";
import cors from "cors";
import genresRouter from "./routes/genres.route";
import gamesRouter from "./routes/games.route";
import platformsRouter from "./routes/platforms.route";

const app = express();
app.use(cors());
app.use(express.json());
app.use(genresRouter);
app.use(gamesRouter);
app.use(platformsRouter);

export default app;
