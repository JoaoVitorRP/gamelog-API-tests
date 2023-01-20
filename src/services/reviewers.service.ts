import { reviewersRepository } from "../repositories/reviewers.repository.js";

async function validateUniqueName(name: string) {
  const userInfo = await reviewersRepository.getReviewerByName(name);
  if (userInfo.rows.length > 0) {
    throw {
      name: "DuplicatedNameError",
      message: "This name is already in use!",
    };
  }
}

async function createReviewer(name: string) {
  await validateUniqueName(name);

  return reviewersRepository.insertReviewer(name);
}

export const reviewersService = {
  createReviewer,
};
