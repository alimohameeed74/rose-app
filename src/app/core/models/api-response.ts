export interface ApiResponse<T> {
  status: boolean;
  code: number;
  payload: T;
}
