import { combineReducers } from 'redux';
import SecondaryReducer from './reducer_secondary';

const rootReducer = combineReducers({
  secondary: SecondaryReducer
});

export default rootReducer;
