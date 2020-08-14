import {combineReducers} from 'redux';
import { NameSpace } from './name-space';
import { userReducer } from './user/user';
import { boardsReducer } from './boards/boards';
import { tasksReducer } from './tasks/tasks';

const rootReducer = combineReducers({
  [NameSpace.USER]: userReducer,
  [NameSpace.BOARDS]: boardsReducer,
  [NameSpace.TASKS]: tasksReducer,
});

export default rootReducer;
