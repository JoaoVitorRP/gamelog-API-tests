import Joi from "joi";

export const platformSchema = Joi.object({
  platform: Joi.string().required(),
});
