import { Router } from "express";
import { getGenres, insertGenre } from "../controllers/genres.controller";
import { validateBody } from "../middlewares/bodyValidation.middleware";
import { genreSchema } from "../schemas/genre.schema";

const genresRouter = Router();

genresRouter.post("/genres", validateBody(genreSchema), insertGenre);
genresRouter.get("/genres", getGenres);

export default genresRouter;
