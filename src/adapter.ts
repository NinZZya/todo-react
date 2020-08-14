import { IBoard, ITask }  from './types';

export const convertToBoards = (boards: IBoard[]) => {
  const boardsMap: any = {};

  boards.forEach((board: IBoard) => {
    boardsMap[board.id] = board;
  });
  return Object.keys(boardsMap).length !== 0 ? boardsMap : null;
};

export const convertToTasks = (tasks: ITask[]) => {
  const tasksMap: any = {};

  tasks.forEach((task: ITask) => {
    tasksMap[task.id] = task;
  });
  return Object.keys(tasksMap).length !== 0 ? tasksMap : null;
};
