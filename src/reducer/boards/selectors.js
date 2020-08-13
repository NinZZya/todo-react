import NameSpace from '../name-space';

const BOARDS_NAME = NameSpace.BOARDS;

export const getActiveBoardId = (state) => {
  return state[BOARDS_NAME].activeBoardId;
};

export const getBoardsStatus = (state) => {
  return state[BOARDS_NAME].boardsStatus;
};

export const getBoard = (state, boardId = state[BOARDS_NAME].activeBoardId) => {
  return state[BOARDS_NAME].boards[boardId];
};

export const getBoards = (state) => {
  const boards = state[BOARDS_NAME].boards;
  return boards ? Object.values(boards) : [];
};
