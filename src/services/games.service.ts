import { GamePostRequest } from "../protocols/index.js";
import { gamesRepository } from "../repositories/games.repository.js";
import { genresService } from "./genres.service.js";
import { platformsService } from "./platforms.service.js";

async function validateUniqueGame(title: string) {
  const gameInfo = await gamesRepository.findGameByTitle(title);
  if (!gameInfo) {
    throw {
      name: "DuplicatedGameName",
      message: "There is already a game with this name!",
    };
  }
}

async function validateGameId(id: number) {
  const gameInfo = await gamesRepository.findGameById(id);
  if (!gameInfo) {
    throw {
      name: "GameNotFound",
      message: "Could not find a game with this id!",
    };
  }
}

async function getGames() {
  const games = await gamesRepository.findGames();

  return games;
}

async function getGamesByGenre(genre: string) {
  const games = await gamesRepository.findGamesByGenre(genre);

  return games;
}

async function createGame(game: GamePostRequest) {
  await validateUniqueGame(game.title);

  await genresService.validateGenreId(game.genre_id);

  await platformsService.validatePlatformId(game.platform_id);

  return gamesRepository.createGame(game);
}

async function updatePlaytime(playtime: number, id: number) {
  await validateGameId(id);

  return gamesRepository.updatePlaytime(playtime, id);
}

async function deleteGame(id: number) {
  await validateGameId(id);

  return gamesRepository.deleteGame(id);
}

async function getAveragePlaytime() {
  const gameInfo = await gamesRepository.findGames();
  if (gameInfo.length <= 1) {
    throw {
      name: "MissingGames",
      message: "Please, add two or more games before trying to calculate average playtime",
    };
  }

  const { _avg } = await gamesRepository.getPlaytimeAverage();

  return _avg.playtime;
}

export const gamesService = {
  getGames,
  getGamesByGenre,
  createGame,
  updatePlaytime,
  deleteGame,
  getAveragePlaytime,
};
