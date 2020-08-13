import { combineReducers } from 'redux';
import NameSpace from './name-space';
import { reducer as user } from './user/user';
import { reducer as boards } from './boards/boards';

const rootReducer = combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.BOARDS]: boards,
});

export default rootReducer;
