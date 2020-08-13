import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.BOARDS;

export const getActiveBoardId = (state) => {
  return state[NAME_SPACE].activeBoardId;
};

export const getBoard = (state, boardId) => {
  return state[NAME_SPACE].boards[boardId];
};

export const getBoards = (state) => {
  const boards = state[NAME_SPACE].boards;
  return boards ? Object.values(boards) : [];
};
