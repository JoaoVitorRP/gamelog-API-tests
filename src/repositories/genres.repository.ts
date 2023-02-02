import prisma from "../database/db";
import { GenrePostRequest } from "../protocols/index";

function createGenre(genreData: GenrePostRequest) {
  return prisma.genres.create({
    data: genreData,
  });
}

function findGenres() {
  return prisma.genres.findMany({
    select: {
      id: true,
      genre: true,
    },
  });
}

function findGenreByName(genre: string) {
  return prisma.genres.findUnique({
    where: { genre },
  });
}

function findGenreById(id: number) {
  return prisma.genres.findUnique({
    where: { id },
  });
}

export const genresRepository = {
  createGenre,
  findGenres,
  findGenreByName,
  findGenreById,
};
