import { combineReducers } from 'redux';
import NameSpace from './name-space';
import { reducer as user } from './user/user';
import { reducer as boards } from './boards/boards';
import { reducer as tasks } from './tasks/tasks';

const rootReducer = combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.BOARDS]: boards,
  [NameSpace.TASKS]: tasks,
});

export default rootReducer;
