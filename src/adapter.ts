import { IBoard, IBoards, ITask, ITasks }  from './types';
// TODO : review
export const convertToBoards = (boards: IBoard[]) => {
  const boardsMap: IBoards | any = {};

  boards.forEach((board: IBoard) => {
    boardsMap[board.id] = board;
  });
  return boardsMap;
};
// TODO : review
export const convertToTasks = (tasks: ITask[]) => {
  const tasksMap: ITasks | any = {};

  tasks.forEach((task: ITask) => {
    tasksMap[task.id] = task;
  });
  return tasksMap;
};
