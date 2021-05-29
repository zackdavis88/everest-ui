import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "./utils";
import createRootReducer from "./reducers";

let store;

function initStore(preloadedState = {}){
  return createStore(
    createRootReducer(),
    preloadedState,
    applyMiddleware(
      thunk,
      apiMiddleware
    )
  );
};

export const initializeStore = (preloadedState=undefined) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if(preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if(typeof window === "undefined")
    return _store;
  // Create the store once in the client
  if(!store)
    store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};

export type RootState = ReturnType<typeof store.getState>
