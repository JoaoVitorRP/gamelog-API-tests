import supertest from "supertest";
import app from "../../src/app";
import { createGame, createGenre, createPlatform } from "../factories";
import { cleanDb, disconnectDb } from "../helpers";

const server = supertest(app);

afterAll(async () => {
  await disconnectDb();
});

beforeEach(async () => {
  await cleanDb();
});

describe("GET /games", () => {
  it("Should respond with status 200 and with games data", async () => {
    const genreData = await createGenre();
    const platformData = await createPlatform();
    const game = {
      title: "Stardew Valley",
      playtime: 10000,
      genre_id: genreData.id,
      platform_id: platformData.id,
    };
    const gameData = await createGame(game);

    const response = await server.get("/games");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: gameData.id,
        title: gameData.title,
        playtime: gameData.playtime,
        genres: {
          genre: genreData.genre,
        },
        platforms: {
          platform: platformData.platform,
        },
      },
    ]);
  });
});

describe("GET /games?genre=", () => {
  it("Should respond with status 404 if there are no games with given genre", async () => {
    const response = await server.get("/games?genre=aaaaaa");

    expect(response.status).toBe(404);
  });

  it("Should respond with status 400 if given genre isn't a string", async () => {
    const response = await server.get("/games?genre=1");

    expect(response.status).toBe(400);
  });

  it("Should respond with status 200 and with games data", async () => {
    const genreData = await createGenre();
    const platformData = await createPlatform();
    const game = {
      title: "Stardew Valley",
      playtime: 10000,
      genre_id: genreData.id,
      platform_id: platformData.id,
    };
    const gameData = await createGame(game);

    const response = await server.get("/games?genre=aventura");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: gameData.id,
        title: gameData.title,
        playtime: gameData.playtime,
        genres: {
          genre: genreData.genre,
        },
        platforms: {
          platform: platformData.platform,
        },
      },
    ]);
  });
});

describe("GET /games?platform=", () => {
  it("Should respond with status 404 if there are no games from given platform", async () => {
    const response = await server.get("/games?platform=aaaaaa");

    expect(response.status).toBe(404);
  });

  it("Should respond with status 400 if given platform isn't a string", async () => {
    const response = await server.get("/games?platform=1");

    expect(response.status).toBe(400);
  });

  it("Should respond with status 200 and with games data", async () => {
    const genreData = await createGenre();
    const platformData = await createPlatform();
    const game = {
      title: "Stardew Valley",
      playtime: 10000,
      genre_id: genreData.id,
      platform_id: platformData.id,
    };
    const gameData = await createGame(game);

    const response = await server.get("/games?platform=steam");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: gameData.id,
        title: gameData.title,
        playtime: gameData.playtime,
        genres: {
          genre: genreData.genre,
        },
        platforms: {
          platform: platformData.platform,
        },
      },
    ]);
  });
});

describe("GET /games/playtime-avg", () => {
  it("Should respond with status 400 if there are less than 2 games in the database", async () => {
    const response = await server.get("/games/playtime-avg");

    expect(response.status).toBe(400);
  });

  it("Should respond with status 200 and with playtime average", async () => {
    const genreData = await createGenre();
    const platformData = await createPlatform();
    const firstGame = {
      title: "Stardew Valley",
      playtime: 10000,
      genre_id: genreData.id,
      platform_id: platformData.id,
    };
    const secondGame = {
      title: "Potion Permit",
      playtime: 5000,
      genre_id: genreData.id,
      platform_id: platformData.id,
    };
    await createGame(firstGame);
    await createGame(secondGame);

    const response = await server.get("/games/playtime-avg");

    expect(response.status).toBe(200);
    expect(response.text).toEqual("Your average playtime is: 7500.00 minutes");
  });
});
