import store from './store';

export type TAppState = typeof store;

export type TAuthData = {
  login: string,
  password: string,
};

export type TId = number | null;

export type TUser = {
  id: TId,
  login: string,
};
