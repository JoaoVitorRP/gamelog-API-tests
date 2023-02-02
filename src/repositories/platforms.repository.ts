import prisma from "../database/db";
import { PlatformPostRequest } from "../protocols/index";

function findPlatformById(id: number) {
  return prisma.platforms.findUnique({
    where: {
      id: id,
    },
  });
}

function findPlatformByName(platform: string) {
  return prisma.platforms.findUnique({
    where: { platform },
  });
}

function createPlatform(platformData: PlatformPostRequest) {
  return prisma.platforms.create({
    data: platformData,
  });
}

function findPlatforms() {
  return prisma.platforms.findMany({
    select: {
      id: true,
      platform: true,
    },
  });
}

export const platformsRepository = {
  findPlatformById,
  findPlatformByName,
  createPlatform,
  findPlatforms,
};
