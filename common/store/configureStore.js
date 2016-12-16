/*由于 configureStore 需要被 client-side 和 server-side 使用，
所以把它输出成 function 方便传入 initialState 使用*/

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(preloadeState) {
    const store = createStore(
        rootReducer,
        preloadeState,
        applyMiddleware(createLogger({stateTransformer: state => state.toJS()}),thunk)
    );
    return store;
}