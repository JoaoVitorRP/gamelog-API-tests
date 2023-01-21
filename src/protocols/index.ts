export type GenreEntity = {
  id: number;
  genre: string;
};

export type Genre = Omit<GenreEntity, "id">;

export type GameEntity = {
  id: number;
  title: string;
  playtime: number;
  genre_id?: number;
  genre?: string;
};

export type Game = Omit<GameEntity, "id">;

export type GameGenre = Omit<GameEntity, "id" | "title" | "playtime" | "genre_id">;

export type GameIdParam = {
  id: string;
};

export type GamePlaytime = Omit<GameEntity, "id" | "title" | "genre_id" | "genre">;
