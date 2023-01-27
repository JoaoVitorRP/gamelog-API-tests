import prisma from "../database/db.js";

function createGenre(genre: string) {
  return prisma.genres.create({
    data: {
      genre: genre,
    },
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
  return prisma.genres.findMany({
    where: {
      genre: genre,
    },
    select: {
      id: true,
      genre: true,
    },
  });
}

function findGenreById(id: number) {
  return prisma.genres.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      genre: true,
    },
  });
}

export const genresRepository = {
  createGenre,
  findGenres,
  findGenreByName,
  findGenreById,
};
