export interface IFindFilters {
  skip: number;
  take: number;
}

export type SearchQuery = Record<string, string | undefined>;
