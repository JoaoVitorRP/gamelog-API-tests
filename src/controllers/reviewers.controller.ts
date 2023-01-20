import { Request, Response } from "express";
import { Reviewer } from "../protocols";
import { reviewersRepository } from "../repositories/reviewers.repository.js";

export async function insertReviewer(req: Request, res: Response) {
  const { name } = req.body as Reviewer;

  try {
    const insertReturn = await reviewersRepository.insertReviewer(name);
    return res.status(201).send(`Your user id is: ${insertReturn.rows[0].id}`);
  } catch (err) {
    if (err.routine === "_bt_check_unique") return res.status(400).send("This user already exists!");
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
