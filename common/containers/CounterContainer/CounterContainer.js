//最后把取出的 count 和事件处理方法用 connect 传到 Counter
import 'babel-polyfill';
import { connect } from 'react-redux';
import Counter from '../../components/Counter';

import  {
    incrementCount,
    decrementCount,
} from '../../actions';

export default connect(
    (state) => ({
        count: state.get('counterReducers').get('count'),
    }),
    (dispatch) => ({
        onIncrement: () => (
            dispatch(incrementCount())
        ),
        onDecrement: () => (
            dispatch(decrementCount())
        ),
    })
)(Counter);

/*
* 连接 React 组件与 Redux store。

 连接操作不会改变原来的组件类，反而返回一个新的已与 Redux store 连接的组件类。

 参数
* */