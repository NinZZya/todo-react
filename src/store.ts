import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReduser from './reducer/reducer';

const store = createStore(
  rootReduser,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
