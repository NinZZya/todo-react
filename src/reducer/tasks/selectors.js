import {createSelector} from 'reselect';
import NameSpace from '../name-space';
import { getBoard } from '../boards/selectors';
import { TasksFilter } from '../../const';

const TASKS_NAME = NameSpace.TASKS;

export const getActiveTaskId = (state) => state[TASKS_NAME].activeTaskId;
export const getTasksFilter = (state) => state[TASKS_NAME].tasksFilter;
export const getTasksStatus = (state) => state[TASKS_NAME].tasksStatus;

export const getTasks = (state) => {
  return state[TASKS_NAME].tasks;
};

export const getTask = (state, taskId = state[TASKS_NAME].activeTaskId) => {
  return state[TASKS_NAME].tasks[taskId];
};

export const getBoardTasks = createSelector(
  getBoard,
  getTasks,
  (board, tasks) => board.tasks.map((taskId) => tasks[taskId])
);

export const getActiveBoardTasks = createSelector(
  getBoardTasks,
  getTasksFilter,
  (tasks, tasksFilter) => {
    console.log(tasks)
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
