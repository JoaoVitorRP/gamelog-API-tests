import prisma from "../src/database/db";

export async function disconnectDb() {
  await prisma.$disconnect();
}

export async function cleanDb() {
  await prisma.games.deleteMany({});
  await prisma.platforms.deleteMany({});
  await prisma.genres.deleteMany({});
}
