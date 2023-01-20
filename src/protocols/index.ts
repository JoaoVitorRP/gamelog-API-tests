export type GenreEntity = {
  id: number;
  genre: string;
};

export type Genre = Omit<GenreEntity, "id">;
