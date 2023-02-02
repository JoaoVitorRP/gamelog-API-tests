import { Router } from "express";
import { getPlatforms, postPlatform } from "../controllers/platforms.controller";
import { validateBody } from "../middlewares/bodyValidation.middleware";
import { platformSchema } from "../schemas/platform.schema";

const platformsRouter = Router();

platformsRouter.post("/platforms", validateBody(platformSchema), postPlatform);
platformsRouter.get("/platforms", getPlatforms);

export default platformsRouter;
