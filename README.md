# reunx

🐧Hooks as store.

## APIs

> A well-designed library whose APIs must be elegant and simple enough.

This library only exposes three functions: `createX`, `useX`, `combineProviders`.

`createX` is used to create a ‘X’ object, which contain a react context and a provider:

```ts
type X<T> = {
  Provider: React.FC
  Context: React.Context<T>
}
```

the X object can be consumed by useX:

```ts
const CounterX = createX(useCounter) // useCounter is a react hook
const { count, decrement, increment } = useX(CounterX)
```

To avoid multiple levels of nesting of providers, you can use `combineProviders` to combine lots of providers as one provider, and use `useX(Xobject)` or `useContext(Xobject.Context)` to get the specific context

```ts
const Provider = combineProviders(CounterX.Provider, TimerX.Provider)
```

Full support for TypeScript!

## examples

```jsx
import React, { useState, useEffect, useCallback } from 'react'
import { createX, useX, combineProviders } from '../src/index'

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
```
