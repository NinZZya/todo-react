export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  AUTH_ERROR: 'AUTH_ERROR',
};

export const PathKey = {
  BOARD: 'board',
  TASK: 'task',
};

export const AppRout = {
  ROOT: `/`,
  BOARD: `/${PathKey.BOARD}`,
  TASK: `/${PathKey.TASK}`,
};

export const TasksFilter = {
  ALL: 'all',
  ACTIVE: 'active',
  ARCHIVE: `archive`,
}

export const Status = {
  LOADING: 'loading',
  LOADED: 'loaded',
};
