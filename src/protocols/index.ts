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
