import store from './store';
import { UserStatus } from './const';
import { NameSpace } from './reducer/name-space';

export type TAppState = typeof store;

export interface IUserState {
  userStatus: UserStatus.NO_AUTH;
  user: any;
};

export interface IAppState {
  [NameSpace.USER]: IUserState;
};

export type TAuthData = {
  login: string,
  password: string,
};

export type TId = number;

export interface IUser {
  id: TId;
  login: string;
};
