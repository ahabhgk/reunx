import React, { useReducer } from 'react'
import { createX, useX } from '../src/index'

const initialState = {
  count: 0,
}

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increament':
      return { count: state.count + 1 }
    case 'decreament':
      return { count: state.count - 1 }
    default:
      return state
  }
}

const CounterX = createX(useReducer, counterReducer, initialState)

const { Provider } = CounterX

const CounterDisplay = () => {
  const [{ count }] = useX(CounterX)

  return <div>count: {count}</div>
}

const CounterButton = () => {
  const [, dispatch] = useX(CounterX)

  return (
    <div>
      <button onClick={() => dispatch({ type: 'increament' })}>+</button>
      <button onClick={() => dispatch({ type: 'decreament' })}>-</button>
    </div>
  )
}

const App = () => (
  <Provider>
    <CounterDisplay />
    <CounterButton />
  </Provider>
)
