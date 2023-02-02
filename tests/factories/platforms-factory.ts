import prisma from "../../src/database/db";

export async function createPlatform(platform: string) {
  return prisma.platforms.create({
    data: { platform },
  });
}

export async function countPlatforms() {
  return prisma.platforms.count();
}
