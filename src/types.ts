import store from './store';
import { UserStatus } from './const';
import { NameSpace } from './reducer/name-space';

export type TAppState = typeof store;
export type TStatus = string;

export type TAuthData = {
  login: string,
  password: string,
};
export type TId = number;

export interface IUser {
  id: TId;
  login: string;
};

export interface IUserState {
  userStatus: UserStatus.NO_AUTH;
  user: IUser;
};

export interface IAppState {
  [NameSpace.USER]: IUserState;
};
