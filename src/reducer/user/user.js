import { AuthorizationStatus } from '../../const';
import { extend } from '../../utils/utils';

export const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: { id: null, login: '' },
};

export const ActionType = {
  REQUIRED_AUTHORIZATION: 'REQUIRED_AUTHORIZATION',
  SET_USER: 'SET_USER',
  RESET_USER: 'RESET_USER'
};

export const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  setUser: (user) => ({
    type: ActionType.SET_USER,
    payload: user,
  }),
  resetUser: () => ({
    type: ActionType.RESET_USER,
    payload: null,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(
        state, {
          authorizationStatus: action.payload
        });
    case ActionType.SET_USER:
      return extend(
        state, {
          user: action.payload,
        });
    case ActionType.RESET_USER:
      return extend(initialState, {});
    default:
      return state;
  }
};
