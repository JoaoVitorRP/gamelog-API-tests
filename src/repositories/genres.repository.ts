import { QueryResult } from "pg";
import { connection } from "../database/db.js";
import { GenreEntity } from "../protocols/index.js";

function insertGenre(genre: string): Promise<QueryResult> {
  return connection.query(
    `
    INSERT INTO
      genres(genre)
    VALUES
      ($1);
    `,
    [genre]
  );
}

function getGenres(): Promise<QueryResult<GenreEntity>> {
  return connection.query(
    `
    SELECT
      id, genre
    FROM
      genres;
    `
  );
}

function getGenreByName(genre: string): Promise<QueryResult<GenreEntity>> {
  return connection.query(
    `
    SELECT
      id, genre
    FROM
      genres
    WHERE
      genre = $1;
    `,
    [genre]
  );
}

function getGenreById(id: number): Promise<QueryResult<GenreEntity>> {
  return connection.query(
    `
    SELECT
      id, genre
    FROM
      genres
    WHERE
      id = $1;
    `,
    [id]
  );
}

export const genresRepository = {
  insertGenre,
  getGenres,
  getGenreByName,
  getGenreById,
};
