import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import allReducers from "./reducers";

const middlewares = [thunk];
process?.env?.NODE_ENV === "development" && middlewares.push(logger);

const composeEnhancers =
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  process?.env?.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
