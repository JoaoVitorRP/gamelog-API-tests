import { Router } from "express";
import { getGenres, insertGenre } from "../controllers/genres.controller.js";
import { validateBody } from "../middlewares/bodyValidation.middleware.js";
import { genreSchema } from "../schemas/genre.schema.js";

const genresRouter = Router();

genresRouter.post("/genres", validateBody(genreSchema), insertGenre);
genresRouter.get("/genres", getGenres);

export default genresRouter;
