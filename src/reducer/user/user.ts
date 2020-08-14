import { Dispatch } from 'redux';
import TODOApi from '../../api';
import { TAuthData, IUser } from '../../types';
import { UserStatus } from '../../const';
import { extend } from '../../utils/utils';

const initialState = {
  userStatus: UserStatus.NO_AUTH,
  user: { id: -1, login: '' },
};

enum userActionType {
  CHANGE_USER_STATUS = 'CHANGE_USER_STATUS',
  SET_USER = 'SET_USER',
  RESET_USER = 'RESET_USER',
};

interface IUserAction {
  type: userActionType;
  payload: IUser | UserStatus | null;
};

export const userActionCreator = {
  changeUserStatus: (status: UserStatus) => ({
    type: userActionType.CHANGE_USER_STATUS,
    payload: status,
  }),
  setUser: (user: IUser) => ({
    type: userActionType.SET_USER,
    payload: user,
  }),
  resetUser: () => ({
    type: userActionType.RESET_USER,
    payload: null,
  }),
};

export const userOperation = {
  login: (authData: TAuthData) => (dispatch: Dispatch, getState: (authData: TAuthData) => void) => {
    return TODOApi.auth(authData)
      .then((responce: IUser ) => {
        dispatch(userActionCreator.changeUserStatus(UserStatus.NO_AUTH));
        dispatch(userActionCreator.setUser(responce));

        const status = responce.id !== -1
          ? UserStatus.AUTH
          : UserStatus.AUTH_ERROR;

        dispatch(userActionCreator.changeUserStatus(status));
      })
      .catch(() => dispatch(userActionCreator.changeUserStatus(UserStatus.LOAD_ERROR)));
  },
}

export const userReducer = (state = initialState, action: IUserAction) => {
  switch (action.type) {
    case userActionType.CHANGE_USER_STATUS:
      return extend(
        state, {
          userStatus: action.payload
        });
    case userActionType.SET_USER:
      return extend(
        state, {
          user: action.payload,
        });
    case userActionType.RESET_USER:
      return extend(initialState, {});
    default:
      return state;
  }
};
