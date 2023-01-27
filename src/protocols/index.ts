export type Genre = {
  genre: string;
};

export type GamePostRequest = {
  title: string;
  playtime: number;
  genre_id: number;
};

export type GameReturn = {
  id: number;
  title: string;
  playtime: number;
  genres: {
    genre: string;
  };
};

export type GameIdParam = {
  id: string;
};

export type GamePlaytime = Omit<GamePostRequest, "title" | "genre_id">;

export type GamePlaytimeAverage = {
  avg: string;
};
