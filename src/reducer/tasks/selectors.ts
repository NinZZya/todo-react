import {createSelector} from 'reselect';
import { NameSpace } from '../name-space';
import { IAppState, IBoard, ITask, ITasks, TId } from '../../types';
import { getBoard } from '../boards/selectors';
import { TasksFilter } from '../../const';

const TASKS_NAME = NameSpace.TASKS;

export const getActiveTaskId = (state: IAppState) => state[TASKS_NAME].activeTaskId;
export const getTasksFilter = (state: IAppState) => state[TASKS_NAME].tasksFilter;
export const getTasksStatus = (state: IAppState) => state[TASKS_NAME].tasksStatus;

export const getTasks = (state: IAppState) => {
  return state[TASKS_NAME].tasks;
};

export const getTask = (state: IAppState, taskId = state[TASKS_NAME].activeTaskId) => {
  const tasks = state[TASKS_NAME].tasks;
  return tasks !== null ? tasks[taskId] : null;
};

export const getBoardTasks = createSelector(
  getBoard,
  getTasks,
  (board: IBoard | null, tasks: ITasks | null) => {
    if (board !== null && tasks !== null) {
      return board.tasks.map((taskId: TId) => tasks[taskId])
    }

    return [];
  }
);

export const getActiveBoardTasks = createSelector(
  getBoardTasks,
  getTasksFilter,
  (tasks: ITask[] | [], tasksFilter: TasksFilter) => {
    switch(tasksFilter) {
      case TasksFilter.ACTIVE:
        return tasks.filter((task) => !task.isDone);
      case TasksFilter.ARCHIVE:
        return tasks.filter((task) => task.isDone);
      default:
        return tasks;
    }
  }
);
