import React, { Component, PropTypes } from 'react'

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

//类型检查

Counter.propTypes = {
    count: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}

//默认类型

Counter.defaultProps = {
    count: 0,
    onIncrement: () => {},
    onDecrement: () => {}
}

export default Counter;