import { Request, Response } from "express";
import { Genre } from "../protocols";
import { genresRepository } from "../repositories/genres.repository.js";

export async function insertGenre(req: Request, res: Response) {
  const { genre } = req.body as Genre;

  try {
    await genresRepository.insertGenre(genre);
    return res.sendStatus(201);
  } catch (err) {
    if (err.routine === "_bt_check_unique") return res.status(400).send("This genre already exists!");
    return res.status(500).send(err.message);
  }
}

export async function getGenres(req: Request, res: Response) {
  try {
    const genres = await genresRepository.getGenres();
    return res.status(200).send(genres.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}
