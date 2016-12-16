//引用babel-polyfill 避免浏览器不支持部分ES6语法
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CounterContainer from '../common/containers/CounterContainer';
import configureStore from '../common/store/configureStore';
import { fromJS } from 'immutable';

//从server取得传进来的initialState, 由于从字符串转换成对象, 又称为rehydration
const initialState = window.__PRELOADED_STATE__;

//由于我们使用ImmutableJs,所以需要先在server-side dehydration再rehydration转成
//ImmutableJS形态,并传进configureStore建立

const store = configureStore(fromJS(initialState));

//接下来就跟一般的React App一样, 把store通过Provider往下传到Component中
ReactDOM.render(
    <Provider store={store}>
        <CounterContainer />
    </Provider>,
    document.getElementById('app')
);
