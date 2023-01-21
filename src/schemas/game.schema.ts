import Joi from "joi";

export const gameSchema = Joi.object({
  title: Joi.string().required(),
  playtime: Joi.number().integer().required(),
  genre_id: Joi.number().integer().required(),
});

export const playtimeSchema = Joi.object({
  playtime: Joi.number().integer().required(),
});
