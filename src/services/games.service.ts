import { gamesRepository } from "../repositories/games.repository.js";
import { genresRepository } from "../repositories/genres.repository.js";

async function validateUniqueGame(title: string) {
  const gameInfo = await gamesRepository.getGameByTitle(title);
  if (gameInfo.rows.length > 0) {
    throw {
      name: "DuplicatedGameName",
      message: "There is already a game with this name!",
    };
  }
}

async function validateGenreId(id: number) {
  const genreInfo = await genresRepository.getGenreById(id);
  if (genreInfo.rows.length === 0) {
    throw {
      name: "GenreNotFound",
      message: "Could not find a genre with this id!",
    };
  }
}

async function createGame(title: string, playtime: number, genre_id: number) {
  await validateUniqueGame(title);

  await validateGenreId(genre_id);

  return gamesRepository.insertGame(title, playtime, genre_id);
}

export const gameService = {
  createGame,
};
