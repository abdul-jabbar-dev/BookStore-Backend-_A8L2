export type TPath = {
  path: string;
  message: string;
};

type TSendError = {
  name: string;
  message: string;
  success?: false;
  path?: TPath[];
  statusCode?: number;
};
export default TSendError;
