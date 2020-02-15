import React from 'react';
declare type X<T> = {
    Provider: React.FC;
    Context: React.Context<T>;
};
declare const createX: <T extends unknown>(useHook: (...args: T[]) => any, ...initialArgs: T[]) => X<T>;
declare const useX: <T extends unknown>(x: X<T>) => T;
declare const combineProvider: (...Providers: React.FC<{}>[]) => React.FC<{}>;
export { createX, useX, combineProvider };
