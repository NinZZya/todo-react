import {combineReducers} from 'redux';
import { NameSpace } from './name-space';
import { userReducer } from './user/user';
import { boardsReducer } from './boards/boards';

const rootReducer = combineReducers({
  [NameSpace.USER]: userReducer,
  [NameSpace.BOARDS]: boardsReducer,
});

export default rootReducer;
