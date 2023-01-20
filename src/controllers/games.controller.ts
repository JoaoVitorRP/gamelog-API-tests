import { Request, Response } from "express";
import { Game, GameGenre } from "../protocols";
import { gamesRepository } from "../repositories/games.repository.js";
import { gameService } from "../services/games.service.js";

export async function insertGame(req: Request, res: Response) {
  const { title, genre_id } = req.body as Game;

  try {
    await gameService.createGame(title, genre_id);
    return res.sendStatus(201);
  } catch (err) {
    if (err.name === "DuplicatedGameName") return res.status(400).send(err.message);
    if (err.name === "GenreNotFound") return res.status(404).send(err.message);
    return res.status(500).send(err.message);
  }
}

export async function getGames(req: Request, res: Response) {
  const { genre } = req.query as GameGenre;

  try {
    const games = await gamesRepository.getGames(genre);
    return res.status(200).send(games.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
