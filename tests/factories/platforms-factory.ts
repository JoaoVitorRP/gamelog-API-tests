import prisma from "../../src/database/db";

export async function createPlatform() {
  return prisma.platforms.create({
    data: {
      platform: "Steam",
    },
  });
}

export async function findPlatforms() {
  return prisma.platforms.findMany();
}

export async function countPlatforms() {
  return prisma.platforms.count();
}
