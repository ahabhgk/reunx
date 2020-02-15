import React, { createContext, useContext } from 'react'

type X<T> = {
  Provider: React.FC
  Context: React.Context<T>
}

function createX<T extends unknown>(useHook: (...args: unknown[]) => T): X<T>
function createX<T extends unknown>(
  useHook: (...args: unknown[]) => T,
  ...initialArgs: unknown[]
): X<T> {
  const Context = createContext<T>(null as any)

  const Provider: React.FC = ({ children }) => {
    const value = useHook(...initialArgs)

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    )
  }

  return { Provider, Context }
}

const useX = <T extends unknown>(x: X<T>) => useContext(x.Context)

const combineProviders = (...Providers: React.FC[]): React.FC => Providers.reduce(
  (Acc, Cur) => ({ children }) => (
    <Acc>
      <Cur>
        {children}
      </Cur>
    </Acc>
  )
)

export { createX, useX, combineProviders }
