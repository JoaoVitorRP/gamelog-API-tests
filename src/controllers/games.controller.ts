import { Request, Response } from "express";
import { Game, GameGenre, GameIdParam, GamePlaytime } from "../protocols";
import { gamesRepository } from "../repositories/games.repository.js";
import { gamesService } from "../services/games.service.js";

export async function insertGame(req: Request, res: Response) {
  const { title, playtime, genre_id } = req.body as Game;

  try {
    await gamesService.createGame(title, playtime, genre_id);
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

export async function patchGame(req: Request, res: Response) {
  const { id } = req.params as GameIdParam;
  const { playtime } = req.body as GamePlaytime;

  try {
    await gamesService.updatePlaytime(playtime, Number(id));
    return res.sendStatus(201);
  } catch (err) {
    if (err.name === "GameNotFound") return res.status(404).send(err.message);
    if (err.message === `invalid input syntax for type integer: "${id}"`)
      return res.status(400).send("Param id must be an integer number");
    return res.status(500).send(err.message);
  }
}

export async function deleteGame(req: Request, res: Response) {
  const { id } = req.params as GameIdParam;

  try {
    await gamesService.deleteGame(Number(id));
    return res.sendStatus(200);
  } catch (err) {
    if (err.name === "GameNotFound") return res.status(404).send(err.message);
    if (err.message === `invalid input syntax for type integer: "${Number(id)}"`)
      return res.status(400).send("Param id must be an integer number");
    return res.status(500).send(err.message);
  }
}

export async function getPlaytimeAverage(req: Request, res: Response) {
  try {
    const average = await gamesService.getAveragePlaytime();
    const time = Number(average.rows[0].avg);
    return res.status(200).send(`Your average playtime is: ${time.toFixed(2)} minutes`);
  } catch (err) {
    if (err.name === "MissingGames") return res.status(400).send(err.message);
    return res.status(500).send(err.message);
  }
}
