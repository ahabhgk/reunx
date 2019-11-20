import { createContext, useContext, createElement as h } from 'react'

const createX = (useHook, ...initialArgs) => {
  const Context = createContext(null)

  const Provider = ({ children }) => {
    const value = useHook(...initialArgs)

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
    Acc.Provider,
    null,
    h(Cur.Provider, null, children)
  ),
)

export { createX, useX, combineX }
