import prisma from "../../src/database/db";

export async function createGenre() {
  return prisma.genres.create({
    data: {
      genre: "Aventura",
    },
  });
}

export async function countGenres() {
  return prisma.genres.count();
}
