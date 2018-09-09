import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import shipping from './shipping';

const reducer = combineReducers({
  shipping,
  routing: routerReducer,
});

export default reducer;
