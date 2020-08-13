import NameSpace from '../name-space';

const BOARDS = NameSpace.BOARDS;

export const getActiveBoardId = (state) => {
  return state[BOARDS].activeBoardId;
};

export const getBoard = (state, boardId = state[BOARDS].activeBoardId) => {
  return state[BOARDS].boards[boardId];
};

export const getBoards = (state) => {
  const boards = state[BOARDS].boards;
  return boards ? Object.values(boards) : [];
};
