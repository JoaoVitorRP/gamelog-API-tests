import prisma from "../database/db.js";
import { GamePlaytime, GamePostRequest } from "../protocols/index.js";

function createGame(gameData: GamePostRequest) {
  return prisma.games.create({
    data: gameData,
  });
}

function findGames() {
  return prisma.games.findMany({
    select: {
      id: true,
      title: true,
      playtime: true,
      genres: {
        select: {
          genre: true,
        },
      },
      platforms: {
        select: {
          platform: true,
        },
      },
    },
  });
}

function findGamesByGenre(genre: string) {
  return prisma.games.findMany({
    select: {
      id: true,
      title: true,
      playtime: true,
      genres: {
        select: {
          genre: true,
        },
      },
      platforms: {
        select: {
          platform: true,
        },
      },
    },
    where: {
      genres: {
        genre: {
          startsWith: genre,
          mode: "insensitive",
        },
      },
    },
  });
}

function findGamesByPlatform(platform: string) {
  return prisma.games.findMany({
    select: {
      id: true,
      title: true,
      playtime: true,
      genres: {
        select: {
          genre: true,
        },
      },
      platforms: {
        select: {
          platform: true,
        },
      },
    },
    where: {
      platforms: {
        platform: {
          startsWith: platform,
          mode: "insensitive",
        },
      },
    },
  });
}

function findGameByTitle(title: string) {
  return prisma.games.findUnique({
    where: { title },
  });
}

function findGameById(id: number) {
  return prisma.games.findUnique({
    where: { id },
  });
}

function updatePlaytime(playtime: GamePlaytime, id: number) {
  return prisma.games.update({
    where: { id },
    data: playtime,
  });
}

function deleteGame(id: number) {
  return prisma.games.delete({
    where: { id },
  });
}

function getPlaytimeAverage() {
  return prisma.games.aggregate({
    _avg: {
      playtime: true,
    },
  });
}

export const gamesRepository = {
  createGame,
  findGames,
  findGamesByGenre,
  findGamesByPlatform,
  findGameByTitle,
  findGameById,
  updatePlaytime,
  deleteGame,
  getPlaytimeAverage,
};
