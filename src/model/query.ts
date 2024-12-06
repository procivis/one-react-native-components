export declare enum SortDirection {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}
export interface ListQuery {
  page: number;
  pageSize: number;
  organisationId: string;
}
export interface ItemList<Item> {
  totalItems: number;
  totalPages: number;
  values: Item[];
}
