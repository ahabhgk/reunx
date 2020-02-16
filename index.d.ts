import React from 'react';
declare type X<T> = {
    Provider: React.FC;
    Context: React.Context<T>;
};
declare function createX<T extends unknown>(useHook: (...args: unknown[]) => T): X<T>;
declare const useX: <T extends unknown>(x: X<T>) => T;
declare const combineProviders: (...Providers: React.FC<{}>[]) => React.FC<{}>;
export { createX, useX, combineProviders };
