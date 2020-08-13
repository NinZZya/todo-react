import TODOApi from '../../api';
import { extend } from '../../utils/utils';

export const initialState = {
  activeBoardId: -1,
  boards: null,
};

export const ActionType = {
  LOAD_BOARDS: 'LOAD_BOARDS',
  SET_ACTIVE_BOARD_ID: 'SET_ACTIVE_BOARD_ID',
  RESET_BOARDS: 'RESET_BOARDS',
};

export const ActionCreator = {
  loadBoards: (boards) => ({
    type: ActionType.LOAD_BOARDS,
    payload: boards,
  }),
  setActiveBoardId: (boardId) => ({
    type: ActionType.SET_ACTIVE_BOARD_ID,
    payload: boardId,
  }),
  resetBoards: () => ({
    type: ActionType.RESET_BOARDS,
    payload: null,
  }),
};

export const Operation = {
  loadBoards: (userId) => (dispatch, getState) => {
    return TODOApi.getBoards(userId)
      .then((responce) => {
        dispatch(ActionCreator.loadBoards(responce));
      });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_BOARDS:
      return extend(
        state, {
        boards: action.payload,
      });
    case ActionType.SET_ACTIVE_BOARD_ID:
      return extend(
        state, {
        activeBoardId: action.payload,
      });
    case ActionType.RESET_BOARDS:
      return extend(initialState, {});

    default:
      return state;
  }
};
