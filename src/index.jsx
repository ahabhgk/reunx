import React, { createContext, useContext } from 'react'

const createX = (useHook, initialState) => {
  const Context = createContext(null)

  const Provider = ({ children }) => {
    const value = useHook(initialState)

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    )
  }

  return { Provider, Context }
}

const useX = (x) => useContext(x.Context)

const combineX = (xs) => xs.reduce(
  (Acc, Cur) => ({ children }) => (
    <Cur.Provider>
      <Acc.Provider>
        {children}
      </Acc.Provider>
    </Cur.Provider>
  )
)

export { createX, useX, combineX }
