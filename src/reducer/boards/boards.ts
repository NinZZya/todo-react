import { Dispatch } from 'redux';
import TODOApi from '../../api';
import { extend } from '../../utils/utils';
import { convertToBoards } from '../../adapter';
import { LoadingStatus } from '../../const';
import { IBoard, IBoards, TId } from '../../types';


export const initialState = {
  activeBoardId: -1,
  boardsStatus: LoadingStatus.INIT,
  boards: null,
};

export enum boardsActionType {
  LOAD_BOARDS = 'LOAD_BOARDS',
  SET_ACTIVE_BOARD_ID = 'SET_ACTIVE_BOARD_ID',
  CHANGE_BOARDS_STATUS = 'CHANGE_BOARDS_STATUS',
  RESET_ACTIVE_BOARD_ID = 'RESET_ACTIVE_BOARD_ID',
  RESET_BOARDS = 'RESET_BOARDS',
};

interface IBoardsAction {
  type: boardsActionType;
  payload: TId | LoadingStatus | IBoards | {};
};

export const boardsActionCreator = {
  loadBoards: (boards: IBoards) => ({
    type: boardsActionType.LOAD_BOARDS,
    payload: boards,
  }),
  setActiveBoardId: (boardId: IBoards) => ({
    type: boardsActionType.SET_ACTIVE_BOARD_ID,
    payload: boardId,
  }),
  changeBoardsStatus: (status: LoadingStatus) => ({
    type: boardsActionType.CHANGE_BOARDS_STATUS,
    payload: status,
  }),
  resetActiveBoardId: () => ({
    type: boardsActionType.RESET_ACTIVE_BOARD_ID,
    payload: null,
  }),
  resetBoards: () => ({
    type: boardsActionType.RESET_BOARDS,
    payload: null,
  }),
};

export const boardsOperation = {
  loadBoards: (userId: TId) => (dispatch: Dispatch, getState: (userId: TId) => void) => {
    dispatch(boardsActionCreator.changeBoardsStatus(LoadingStatus.LOADING));

    return TODOApi.getBoards(userId)
      .then((responce: IBoard[]) => {
          const boards = responce.length > 0 ? convertToBoards(responce) : {};
          dispatch(boardsActionCreator.changeBoardsStatus(LoadingStatus.SUCSESS));
          dispatch(boardsActionCreator.loadBoards(boards));
      })
      .catch(() => dispatch(
        boardsActionCreator.changeBoardsStatus(LoadingStatus.ERROR))
      );
  },
};

export const boardsReducer = (state = initialState, action: IBoardsAction) => {
  switch (action.type) {
    case boardsActionType.LOAD_BOARDS:
      return extend(
        state, {
        boards: action.payload,
      });
    case boardsActionType.SET_ACTIVE_BOARD_ID:
      return extend(
        state, {
        activeBoardId: action.payload,
      });
    case boardsActionType.CHANGE_BOARDS_STATUS:
      return extend(
        state, {
        boardsStatus: action.payload,
      });
    case boardsActionType.RESET_ACTIVE_BOARD_ID:
        return extend(state, {
          activeBoardId: initialState.activeBoardId,
        });
    case boardsActionType.RESET_BOARDS:
      return extend(initialState, {});

    default:
      return state;
  }
};
