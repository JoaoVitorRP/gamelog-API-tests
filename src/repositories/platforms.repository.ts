import prisma from "../database/db.js";

function findPlatformById(id: number) {
  return prisma.platforms.findUnique({
    where: {
      id: id,
    },
  });
}

export const platformsRepository = {
  findPlatformById,
};
