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

async function createGenre(genre: string) {
  await validateUniqueGenre(genre);

  return genresRepository.createGenre(genre);
}

function getGenres() {
  return genresRepository.findGenres();
}

export const genresService = {
  createGenre,
  getGenres,
};
