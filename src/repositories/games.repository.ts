import { QueryResult } from "pg";
import { connection } from "../database/db.js";
import { GameEntity, GameEntityWithJoin } from "../protocols";

function insertGame(title: string, genre_id: number): Promise<QueryResult> {
  return connection.query(
    `
    INSERT INTO
      games(title, genre_id)
    VALUES
      ($1, $2);
    `,
    [title, genre_id]
  );
}

function getGames(genre: string): Promise<QueryResult<GameEntityWithJoin>> {
  return connection.query(
    `
    SELECT
      ga.id, ga.title, ge.genre
    FROM
      games ga
    JOIN
      genres ge
    ON
      ga.genre_id = ge.id
    ${genre ? `WHERE ge.genre ILIKE $1` : ``};
    `,
    genre ? [genre] : []
  );
}

function getGameByTitle(title: string): Promise<QueryResult<GameEntity>> {
  return connection.query(
    `
    SELECT
      id, title, genre_id
    FROM
      games
    WHERE
      title = $1;
    `,
    [title]
  );
}

export const gamesRepository = {
  insertGame,
  getGames,
  getGameByTitle,
};
