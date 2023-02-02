import prisma from "../../src/database/db";

export async function createGenre(genre: string) {
  return prisma.genres.create({
    data: { genre },
  });
}

export async function countGenres() {
  return prisma.genres.count();
}
