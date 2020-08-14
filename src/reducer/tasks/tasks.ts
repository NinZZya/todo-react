import { Dispatch } from 'redux';
import TODOApi from '../../api';
import { extend } from '../../utils/utils';
import { TasksFilter } from '../../const';
import { convertToTasks } from '../../adapter';
import { LoadingStatus } from '../../const';
import { ITask, ITasks, TId } from '../../types';

const initialState = {
  activeTaskId: -1,
  tasksStatus: LoadingStatus.INIT,
  tasksFilter: TasksFilter.ACTIVE,
  tasks: null,
};

export enum tasksActionType {
  LOAD_TASKS = 'LOAD_TASKS',
  SET_ACTIVE_TASK_ID = 'SET_ACTIVE_TASK_ID',
  CHANGE_TASKS_FILTER = 'CHANGE_TASKS_FILTER',
  CHANGE_TASKS_STATUS = 'CHANGE_TASKS_STATUS',
  RESET_ACTIVE_TASK_ID = 'RESET_ACTIVE_TASK_ID',
  RESET_TASKS = 'RESET_TASKS',
};

interface ITasksAction {
  type: tasksActionType;
  payload: TId | LoadingStatus | ITasks | TasksFilter | {} | null;
};

export const tasksActionCreator = {
  loadTasks: (tasks: ITasks) => ({
    type: tasksActionType.LOAD_TASKS,
    payload: tasks,
  }),
  setActiveTaskId: (activeTaskId: TId) => ({
    type: tasksActionType.SET_ACTIVE_TASK_ID,
    payload: activeTaskId,
  }),
  changeTasksStatus: (status: LoadingStatus) => ({
    type: tasksActionType.CHANGE_TASKS_STATUS,
    payload: status,
  }),
  changeTasksFilter: (taskFilter: TasksFilter) => ({
    type: tasksActionType.CHANGE_TASKS_FILTER,
    payload: taskFilter,
  }),
  resetActiveTaskId: () => ({
    type: tasksActionType.SET_ACTIVE_TASK_ID,
    payload: null,
  }),
  resetTasks: () => ({
    type: tasksActionType.RESET_TASKS,
    payload: null,
  }),
};

export const tasksOperation = {
  loadTasks: (userId: TId) => (dispatch: Dispatch, getState: (userId: TId) => void) => {
    dispatch(tasksActionCreator.changeTasksStatus(LoadingStatus.LOADING));

    return TODOApi.getTasks(userId)
      .then((responce: ITask[]) => {
        const tasks = convertToTasks(responce)
        dispatch(tasksActionCreator.loadTasks(tasks));
      })
      .then(() => {
        dispatch(tasksActionCreator.changeTasksStatus(LoadingStatus.SUCCESS))
      })
      .catch(() => dispatch(
        tasksActionCreator.changeTasksStatus(LoadingStatus.ERROR))
      );
  },
};

export const tasksReducer = (state = initialState, action: ITasksAction) => {
  switch (action.type) {
    case tasksActionType.LOAD_TASKS:
      return extend(
        state, {
        tasks: action.payload,
      });
    case tasksActionType.SET_ACTIVE_TASK_ID:
      return {
        ...state,
        activeTaskId: action.payload,
      };
    case tasksActionType.CHANGE_TASKS_FILTER:
      return extend(
        state, {
        tasksFilter: action.payload,
      });
    case tasksActionType.CHANGE_TASKS_STATUS:
      return extend(
        state, {
        tasksStatus: action.payload,
      });
    case tasksActionType.RESET_ACTIVE_TASK_ID:
      return extend(
        state, {
        activeTaskId: initialState.activeTaskId,
      });
    case tasksActionType.RESET_TASKS:
      return extend(initialState, {});

    default:
      return state;
  }
};
