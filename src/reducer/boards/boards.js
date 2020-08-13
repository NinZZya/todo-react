import TODOApi from '../../api';
import { extend } from '../../utils/utils';
import { convertToBoards } from '../../adapter';
import { Status } from '../../const';

export const initialState = {
  activeBoardId: -1,
  boardsStatus: null,
  boards: null,
};

export const ActionType = {
  LOAD_BOARDS: 'LOAD_BOARDS',
  SET_ACTIVE_BOARD_ID: 'SET_ACTIVE_BOARD_ID',
  CHANGE_BOARDS_STATUS: 'CHANGE_BOARDS_STATUS',
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
  changeBoardsStatus: (status) => ({
    type: ActionType.CHANGE_BOARDS_STATUS,
    payload: status,
  }),
  resetBoards: () => ({
    type: ActionType.RESET_BOARDS,
    payload: null,
  }),
};

export const Operation = {
  loadBoards: (userId) => (dispatch, getState) => {
    dispatch(ActionCreator.changeBoardsStatus(Status.LOADING));
    return TODOApi.getBoards(userId)
      .then((responce) => {
        const boards = responce.length > 0 ? convertToBoards(responce) : {};
        console.log(boards)
        dispatch(ActionCreator.loadBoards(boards));
        dispatch(ActionCreator.changeBoardsStatus(Status.LOADED));
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
    case ActionType.CHANGE_BOARDS_STATUS:
      return extend(
        state, {
        boardsStatus: action.payload,
      });
    case ActionType.RESET_BOARDS:
      return extend(initialState, {});

    default:
      return state;
  }
};
