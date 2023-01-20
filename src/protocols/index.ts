export type GenreEntity = {
  id: number;
  genre: string;
};

export type Genre = Omit<GenreEntity, "id">;

export type GameEntity = {
  id: number;
  title: string;
  playtime: number;
  genre_id: number;
};

export type Game = Omit<GameEntity, "id">;

export type GameEntityWithJoin = {
  id: number;
  title: string;
  playtime: number;
  genre: string;
};

export type GameGenre = {
  genre: string;
};
