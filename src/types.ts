import store from './store';

export type TAppState = typeof store;

export type TAuthData = {
  login: string,
  password: string,
};
