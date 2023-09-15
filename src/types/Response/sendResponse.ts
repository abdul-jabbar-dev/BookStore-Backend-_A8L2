export type TSendMeta = {
  page: number;
  size: number;
  total: number;
  totalPage: number;
};

type TSendResponse<T> = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: T;
  meta?: TSendMeta;
};
export type TSendData<T> = {
  data: T;
  meta?: TSendMeta;
};

export default TSendResponse;
