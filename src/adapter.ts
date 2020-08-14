import { IBoard, IBoards }  from './types';
// TODO : review
export const convertToBoards = (boards: IBoard[]) => {
  const valuesMap: IBoards | any = {};

  boards.forEach((board: IBoard) => {
    valuesMap[board.id] = board;
  });
  return valuesMap;
};

