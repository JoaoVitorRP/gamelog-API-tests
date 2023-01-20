import Joi from "joi";

export const reviewerSchema = Joi.object({
  name: Joi.string().required(),
});
