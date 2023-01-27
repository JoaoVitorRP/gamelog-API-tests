import { genresRepository } from "../repositories/genres.repository.js";

async function validateUniqueGenre(genre: string) {
  const genreInfo = await genresRepository.findGenreByName(genre);
  if (genreInfo) {
    throw {
      name: "DuplicatedGenreName",
      message: "This genre already exists!",
    };
  }
}

async function validateGenreId(id: number) {
  const genreInfo = await genresRepository.findGenreById(id);
  if (!genreInfo) {
    throw {
      name: "GenreNotFound",
      message: "Could not find a genre with this id!",
    };
  }
}

async function createGenre(genre: string) {
  await validateUniqueGenre(genre);

  return genresRepository.createGenre(genre);
}

function getGenres() {
  return genresRepository.findGenres();
}

export const genresService = {
  validateGenreId,
  createGenre,
  getGenres,
};
