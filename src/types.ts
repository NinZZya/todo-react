import store from './store';
import { UserStatus, LoadingStatus, TasksFilter } from './const';
import { NameSpace } from './reducer/name-space';

export type TAppState = typeof store;
export type TStatus = string;

export type TAuthData = {
  login: string,
  password: string,
};
export type TId = number;

export interface IUser {
  id: TId;
  login: string;
};

export interface IBoard {
  id: TId;
  title: string;
  userId: TId;
  tasks: TId[];
};

export interface IBoards {
  [key: number]: IBoard;
};

export interface ITask {
  id: TId;
  title: string;
  description: string;
  userId: TId;
  isDone: boolean;
};

export interface ITasks {
  [key: number]: ITask;
};

export interface IUserState {
  userStatus: UserStatus.NO_AUTH;
  user: IUser | null;
};

export interface IBoardsState {
  activeBoardId: TId;
  boardsStatus: LoadingStatus;
  boards: IBoards | null;
};
export interface ITasksState {
  activeTaskId: TId,
  tasksStatus: LoadingStatus,
  tasksFilter: TasksFilter,
  tasks: ITasks | null,
};
export interface IAppState {
  [NameSpace.USER]: IUserState;
  [NameSpace.BOARDS]: IBoardsState;
  [NameSpace.TASKS]: ITasksState;
};
