import { NameSpace } from '../name-space';
import { IAppState } from '../../types';

export const getUserStatus = (state: IAppState) => {
  return state[NameSpace.USER].userStatus;
};

export const getUser = (state: IAppState) => {
  return state[NameSpace.USER].user;
};
