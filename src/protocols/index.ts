export type Genre = {
  genre: string;
};

export type GamePostRequest = {
  title: string;
  playtime: number;
  genre_id: number;
  platform_id: number;
};

export type GameReturn = {
  id: number;
  title: string;
  playtime: number;
  genres: {
    genre: string;
  };
  platforms: {
    platform: string;
  };
};

export type GameIdParam = {
  id: string;
};

export type GamePlaytime = Omit<GamePostRequest, "title" | "genre_id" | "platforn_id">;

export type GamePlaytimeAverage = {
  avg: string;
};

export type PlatformReturn = {
  id: number;
  platform: string;
};

export type PlatformPostRequest = Omit<PlatformReturn, "id">;
