import { PlatformPostRequest } from "../protocols/index";
import { platformsRepository } from "../repositories/platforms.repository";

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

async function validatePlatformName(platform: string) {
  const platforms = await platformsRepository.findPlatformByName(platform);

  if (platforms) {
    throw {
      name: "DuplicatedPlatformName",
      message: "This platform already exists!",
    };
  }
}

async function postPlatform(platformData: PlatformPostRequest) {
  await validatePlatformName(platformData.platform);

  await platformsRepository.createPlatform(platformData);
}

async function getPlatforms() {
  return platformsRepository.findPlatforms();
}

export const platformsService = {
  validatePlatformId,
  postPlatform,
  getPlatforms,
};
