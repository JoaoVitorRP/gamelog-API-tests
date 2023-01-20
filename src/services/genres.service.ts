import { genresRepository } from "../repositories/genres.repository.js";

async function validateUniqueGenre(genre: string) {
  const genreInfo = await genresRepository.getGenreByName(genre);
  if (genreInfo.rows.length > 0) {
    throw {
      name: "DuplicatedGenreName",
      message: "This genre already exists!",
    };
  }
}

async function createGenre(genre: string) {
  await validateUniqueGenre(genre);

  return genresRepository.insertGenre(genre);
}

export const genresService = {
  createGenre,
};
