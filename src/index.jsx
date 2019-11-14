import React, { createContext, useContext } from 'react'

const createX = (useHook) => {
  const Context = createContext(null)

  const Provider = ({ initialState, children }) => {
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
  (CurrentX, NextX) => ({ children }) => (
    <NextX.Provider>
      <CurrentX.Provider>
        {children}
      </CurrentX.Provider>
    </NextX.Provider>
  )
)

export { createX, useX, combineX }
