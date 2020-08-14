export enum UserStatus {
  AUTH ='AUTH',
  NO_AUTH = 'NO_AUTH',
  AUTH_ERROR = 'AUTH_ERROR',
  LOAD_ERROR = 'LOAD_ERROR',
};

export enum LoadingStatus {
  INIT = 'INIT',
  LOADING = 'LOADING',
  SUCSESS = 'SUCSESS',
  ERROR = 'SUCSESS',
};

export enum PathKey {
  BOARD = 'board',
  TASK ='task',
};

export const AppRout = {
  ROOT: `/`,
  BOARD: `/${PathKey.BOARD}`,
  TASK: `/${PathKey.TASK}`,
};
