import React, {Component, PropTypes } from 'react';

const Counter = ({
    count,
    onIncrement,
    onDecrement,
}) => (
    <p>
        Clicked: {count} times
        {' '}
        <button onClick={onIncrement}>
            +
        </button>
        {' '}
        <button onClick={onDecrement}>
            -
        </button>
        {' '}
    </p>
);

//注意检查propTypes和给定的预设值
Counter.prototype = {
    counter: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}
Counter.defaultProps = {
    count: 0,
    onIncrement: () => {},
    onDecrement: () => {}
}

export default Counter;