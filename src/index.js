import { createContext, useContext, createElement as h } from 'react'

const createX = (useHook, initialState) => {
  const Context = createContext(null)

  const Provider = ({ children }) => {
    const value = useHook(initialState)

    return h(
      Context.Provider,
      { value },
      children,
    )
  }

  return { Provider, Context }
}

const useX = (x) => useContext(x.Context)

const combineX = (...xs) => xs.reduce(
  (Acc, Cur) => ({ children }) => h(
    Cur.Provider,
    null,
    h(Acc.Provider, null, children)
  )
)

export { createX, useX, combineX }
