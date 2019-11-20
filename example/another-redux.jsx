import React, { useReducer, useCallback } from 'react'
import { createX, useX } from '../src/index'

const useCounter = (initialState = { count: 0 }) => {
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

  const [{ count }, dispatch] = useReducer(counterReducer, initialState)
  const increace = useCallback(() => dispatch({ type: 'increament' }), [])
  const decreace = useCallback(() => dispatch({ type: 'decreament' }), [])

  return { count, increace, decreace }
}

const CounterX = createX(useCounter)

const { Provider } = CounterX

const CounterDisplay = () => {
  const { count } = useX(CounterX)

  return <div>count: {count}</div>
}

const CounterButton = () => {
  const { increace, decreace } = useX(CounterX)

  return (
    <div>
      <button onClick={increace}>+</button>
      <button onClick={decreace}>-</button>
    </div>
  )
}

const App = () => (
  <Provider>
    <CounterDisplay />
    <CounterButton />
  </Provider>
)
