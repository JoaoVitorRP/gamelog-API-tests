import { Router } from "express";
import { getReviewers, insertReviewer } from "../controllers/reviewers.controller.js";
import { validateBody } from "../middlewares/bodyValidation.middleware.js";
import { reviewerSchema } from "../schemas/reviewer.schema.js";

const reviewersRouter = Router();

reviewersRouter.post("/reviewers", validateBody(reviewerSchema), insertReviewer);
reviewersRouter.get("/reviewers", getReviewers);

export default reviewersRouter;
