# reunx

## examples

```jsx
import React, { useState, useEffect, useCallback } from 'react'
import { createX, useX, combineX } from '../src/index'

const useCounter = (initialState = 0) => {
  const [count, setCount] = useState(initialState)
  const decrement = useCallback(() => setCount(count - 1), [count])
  const increment = useCallback(() => setCount(count + 1), [count])

  return { count, decrement, increment }
}

const useTimer = (initialState = 0) => {
  const [time, setTime] = useState(initialState)

  useEffect(() => {
    const timer = setInterval(
      () => setTime(t => t + 1),
      1000,
    )

    return () => {
      clearInterval(timer)
    }
  })

  return time
}

const CounterX = createX(useCounter)
const TimerX = createX(useTimer)

const Counter = () => {
  const { count, decrement, increment } = useX(CounterX)

  return (
    <div>
      count: {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}

const Timer = () => {
  const time = useX(TimerX)

  return <div>timer: {time}</div>
}

const Provider = combineX(CounterX, TimerX)

const App = () => (
  <Provider>
    <Counter />
    <Timer />
    <Counter />
    <Timer />
  </Provider>
)
```

```jsx
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
```

```jsx
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
```
