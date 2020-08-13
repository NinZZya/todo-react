import TODOApi from '../../api';
import { extend } from '../../utils/utils';
import { TasksFilter } from '../../const';
import { convertToTasks } from '../../adapter';
import { Status } from '../../const';

export const initialState = {
  activeTaskId: -1,
  tasks: null,
  tasksStatus: null,
  tasksFilter: TasksFilter.ACTIVE,
};

export const ActionType = {
  LOAD_TASKS: 'LOAD_TASKS',
  SET_ACTIVE_TASK_ID: 'SET_ACTIVE_TASK_ID',
  CHANGE_TASKS_FILTER: 'CHANGE_TASKS_FILTER',
  CHANGE_TASKS_STATUS: 'CHANGE_TASKS_STATUS',
  RESET_ACTIVE_TASK_ID: 'RESET_ACTIVE_TASK_ID',
  RESET_TASKS: 'RESET_TASKS',
};

export const ActionCreator = {
  loadTasks: (tasks) => ({
    type: ActionType.LOAD_TASKS,
    payload: tasks,
  }),
  setActiveTaskId: (activeTaskId) => ({
    type: ActionType.SET_ACTIVE_TASK_ID,
    payload: activeTaskId,
  }),
  changeTasksStatus: (status) => ({
    type: ActionType.CHANGE_TASKS_STATUS,
    payload: status,
  }),
  changeTasksFilter: (taskFilter) => ({
    type: ActionType.CHANGE_TASKS_FILTER,
    payload: taskFilter,
  }),
  resetActiveTaskId: () => ({
    type: ActionType.SET_ACTIVE_TASK_ID,
    payload: null,
  }),
  resetTasks: () => ({
    type: ActionType.RESET,
    payload: null,
  }),
};

export const Operation = {
  loadTasks: (userId) => (dispatch, getState) => {
    dispatch(ActionCreator.changeTasksStatus(Status.LOADING));

    return TODOApi.getTasks(userId)
      .then((responce) => {
        const tasks = convertToTasks(responce)
        dispatch(ActionCreator.loadTasks(tasks));
      })
      .then(() => {
        dispatch(ActionCreator.changeTasksStatus(Status.LOADED))
      });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_TASKS:
      return extend(
        state, {
        tasks: action.payload,
      });
    case ActionType.SET_ACTIVE_TASK_ID:
      return {
        ...state,
        activeTaskId: action.payload,
      };
    case ActionType.CHANGE_TASKS_FILTER:
      return extend(
        state, {
        tasksFilter: action.payload,
      });
    case ActionType.CHANGE_TASKS_STATUS:
      return extend(
        state, {
        tasksStatus: action.payload,
      });
    case ActionType.RESET_ACTIVE_TASK_ID:
      return extend(
        state, {
        activeTaskId: initialState.activeTaskId,
      });
    case ActionType.RESET_TASKS:
      return extend(initialState, {});

    default:
      return state;
  }
};
