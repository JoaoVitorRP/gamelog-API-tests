import { GamePlaytime, GamePostRequest } from "../protocols/index.js";
import { gamesRepository } from "../repositories/games.repository.js";
import { genresService } from "./genres.service.js";
import { platformsService } from "./platforms.service.js";

async function validateUniqueGame(title: string) {
  const gameData = await gamesRepository.findGameByTitle(title);
  if (gameData) {
    throw {
      name: "DuplicatedGameName",
      message: "There is already a game with this name!",
    };
  }
}

async function validateGameId(id: number) {
  const gameData = await gamesRepository.findGameById(id);
  if (!gameData) {
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

async function createGame(gameData: GamePostRequest) {
  await validateUniqueGame(gameData.title);

  await genresService.validateGenreId(gameData.genre_id);

  await platformsService.validatePlatformId(gameData.platform_id);

  return gamesRepository.createGame(gameData);
}

async function updatePlaytime(playtime: GamePlaytime, id: number) {
  await validateGameId(id);

  return gamesRepository.updatePlaytime(playtime, id);
}

async function deleteGame(id: number) {
  await validateGameId(id);

  return gamesRepository.deleteGame(id);
}

async function getAveragePlaytime() {
  const gameData = await gamesRepository.findGames();
  if (gameData.length <= 1) {
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
