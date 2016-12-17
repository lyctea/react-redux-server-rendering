import { combineReducres } from 'redux-immutable';
import counterReducers from './counterReducers';

const rootReducer = combineReducres({
    counterReducers
});

export default rootReducer;