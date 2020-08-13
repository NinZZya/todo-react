import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.BOARDS;

export const getActiveBoardId = (state) => {
  return state[NAME_SPACE].activeBoardId;
};

export const getBoards = (state) => {
  return state[NAME_SPACE].boards;
};
