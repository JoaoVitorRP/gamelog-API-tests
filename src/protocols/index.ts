export type GenreEntity = {
  id: number;
  genre: string;
};

export type Genre = Omit<GenreEntity, "id">;

export type ReviewerEntity = {
  id: number;
  name: string;
};

export type Reviewer = Omit<ReviewerEntity, "id">;

export type ReviewerId = Omit<ReviewerEntity, "name">;

export type GameEntity = {
  id: number;
  title: string;
  genre_id: number;
};

export type Game = Omit<GameEntity, "id">;

export type GameEntityWithJoin = {
  id: number;
  title: string;
  genre: string;
};

export type GameGenre = {
  genre: string;
};
