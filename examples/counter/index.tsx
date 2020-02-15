import React, { useState, useEffect, useCallback } from 'react'
import { createX, useX, combineProviders } from '../../src/index'

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

const Provider = combineProviders(CounterX.Provider, TimerX.Provider)

const App = () => (
  <Provider>
    <Counter />
    <Timer />
    <Counter />
    <Timer />
  </Provider>
)
