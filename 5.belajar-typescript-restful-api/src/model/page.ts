export interface Paging {
  page: number;
  totalPage: number;
  totalItem: number;
}

export interface Pageable<T> {
  data: Array<T>;
  paging: Paging;
}
