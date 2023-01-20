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
        *
    FROM
        genres;    
    `
  );
}

export const genresRepository = {
  insertGenre,
  getGenres,
};
