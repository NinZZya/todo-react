import {combineReducers} from 'redux';
import { userReducer } from './user/user';
import { NameSpace } from './name-space';

const rootReducer = combineReducers({
  [NameSpace.USER]: userReducer
});

export default rootReducer;
