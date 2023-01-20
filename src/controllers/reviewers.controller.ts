import { Request, Response } from "express";
import { Reviewer } from "../protocols";
import { reviewersRepository } from "../repositories/reviewers.repository.js";
import { reviewersService } from "../services/reviewers.service.js";

export async function insertReviewer(req: Request, res: Response) {
  const { name } = req.body as Reviewer;

  try {
    const insertReturn = await reviewersService.createReviewer(name);
    return res.status(201).send(`Your user id is: ${insertReturn.rows[0].id}`);
  } catch (err) {
    if (err.name === "DuplicatedNameError") return res.status(400).send(err.message);
    return res.status(500).send(err.message);
  }
}

export async function getReviewers(req: Request, res: Response) {
  try {
    const reviewers = await reviewersRepository.getReviewers();
    return res.status(200).send(reviewers.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
