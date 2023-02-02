import supertest from "supertest";
import app from "../../src/app";
import { countGenres, createGenre } from "../factories";
import { cleanDb, disconnectDb } from "../helpers";

const server = supertest(app);

afterAll(async () => {
  await disconnectDb();
});

beforeEach(async () => {
  await cleanDb();
});

describe("GET /genres", () => {
  it("Should respond with status 200 and with genres data", async () => {
    const genreData = await createGenre();

    const response = await server.get("/genres");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: genreData.id,
        genre: genreData.genre,
      },
    ]);
  });
});

describe("POST /genres", () => {
  it("Should respond with status 422 when body is invalid", async () => {
    const response = await server.post("/genres").send({
      name: "Aventura",
    });

    expect(response.status).toBe(422);
  });

  it("Should respond with status 409 when genre already exists", async () => {
    await createGenre();

    const response = await server.post("/genres").send({
      genre: "Aventura",
    });

    expect(response.status).toBe(409);
  });

  it("Should respond with status 201 and insert a new genre in the database", async () => {
    const response = await server.post("/genres").send({
      genre: "Aventura",
    });

    const entityCount = await countGenres();

    expect(response.status).toBe(201);
    expect(entityCount).toEqual(1);
  });
});
