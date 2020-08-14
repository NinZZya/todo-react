import { NameSpace } from '../name-space';
import { IAppState } from '../../types';

const BOARDS_NAME = NameSpace.BOARDS;

export const getActiveBoardId = (state: IAppState) => state[BOARDS_NAME].activeBoardId;
export const getBoardsStatus = (state: IAppState) => state[BOARDS_NAME].boardsStatus;

export const getBoard = (state: IAppState) => {
  const boardId = state[BOARDS_NAME].activeBoardId;
  const boards = state[BOARDS_NAME].boards;
  return boards !== null ? boards[boardId] : null;
};

export const getBoards = (state: IAppState) => {
  const boards = state[BOARDS_NAME].boards;
  return boards !== null ? Object.values(boards) : [];
};
