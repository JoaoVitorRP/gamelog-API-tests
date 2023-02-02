import prisma from "../../src/database/db";
import { GamePostRequest } from "../../src/protocols";

export async function createGame(game: GamePostRequest) {
  return prisma.games.create({
    data: game,
  });
}
