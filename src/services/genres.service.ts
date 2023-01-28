import { GenrePostRequest } from "../protocols/index.js";
import { genresRepository } from "../repositories/genres.repository.js";

async function validateUniqueGenre(genre: string) {
  const genreData = await genresRepository.findGenreByName(genre);
  if (genreData) {
    throw {
      name: "DuplicatedGenreName",
      message: "This genre already exists!",
    };
  }
}

async function validateGenreId(id: number) {
  const genreData = await genresRepository.findGenreById(id);
  if (!genreData) {
    throw {
      name: "GenreNotFound",
      message: "Could not find a genre with this id!",
    };
  }
}

async function createGenre(genreData: GenrePostRequest) {
  await validateUniqueGenre(genreData.genre);

  return genresRepository.createGenre(genreData);
}

function getGenres() {
  return genresRepository.findGenres();
}

export const genresService = {
  validateGenreId,
  createGenre,
  getGenres,
};
