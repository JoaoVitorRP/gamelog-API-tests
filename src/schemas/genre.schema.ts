import Joi from "joi";

export const genreSchema = Joi.object({
  genre: Joi.string().required(),
});
