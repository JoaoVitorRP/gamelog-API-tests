import Joi from "joi";

export const gameSchema = Joi.object({
  title: Joi.string().required(),
  genre_id: Joi.number().integer().required(),
});
