import { platformsRepository } from "../repositories/platforms.repository.js";

async function validatePlatformId(id: number) {
  const platforms = await platformsRepository.findPlatformById(id);

  if (!platforms) {
    throw {
      name: "PlatformNotFound",
      message: "Could not find a platform with this id!",
    };
  }

  return platforms;
}

export const platformsService = {
  validatePlatformId,
};
