import { Router } from "express";
import { getPlatforms, postPlatform } from "../controllers/platforms.controller.js";
import { validateBody } from "../middlewares/bodyValidation.middleware.js";
import { platformSchema } from "../schemas/platform.schema.js";

const platformsRouter = Router();

platformsRouter.post("/platforms", validateBody(platformSchema), postPlatform);
platformsRouter.get("/platforms", getPlatforms);

export default platformsRouter;
