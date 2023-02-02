import supertest from "supertest";
import app from "../../src/app";
import { countPlatforms, createPlatform } from "../factories";
import { cleanDb, disconnectDb } from "../helpers";

const server = supertest(app);

afterAll(async () => {
  await disconnectDb();
});

beforeEach(async () => {
  await cleanDb();
});

describe("GET /platforms", () => {
  it("Should respond with status 200 and with platforms data", async () => {
    const platformData = await createPlatform("Steam");

    const response = await server.get("/platforms");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: platformData.id,
        platform: platformData.platform,
      },
    ]);
  });
});

describe("POST /platforms", () => {
  it("Should respond with status 422 when body is invalid", async () => {
    const response = await server.post("/platforms").send({
      name: "Steam",
    });

    expect(response.status).toBe(422);
  });

  it("Should respond with status 409 when platform already exists", async () => {
    await createPlatform("Steam");

    const response = await server.post("/platforms").send({
      platform: "Steam",
    });

    expect(response.status).toBe(409);
  });

  it("Should respond with status 201 and insert a new platform in the database", async () => {
    const response = await server.post("/platforms").send({
      platform: "Steam",
    });

    const entityCount = await countPlatforms();

    expect(response.status).toBe(201);
    expect(entityCount).toEqual(1);
  });
});
