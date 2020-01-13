import { createContext, useContext, createElement as h } from 'react'

interface IProvider {
  (props: React.Props<any>): any
}

interface IX {
  Provider: IProvider
  Context: React.Context<any>
}

const createX = (useHook, ...initialArgs): IX => {
  const Context = createContext(null)

  const Provider: IProvider = ({ children }) => {
    const value = useHook(...initialArgs)

    return h(
      Context.Provider,
      { value },
      children,
    )
  }

  return { Provider, Context }
}

const useX = (x: IX) => useContext(x.Context)

const combineX = (...xs) => xs.reduce(
  (Acc, Cur) => ({ children }) => h(
    Acc.Provider,
    null,
    h(Cur.Provider, null, children)
  ),
)

export { createX, useX, combineX }
