import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import allReducers from "./reducers";

const middlewares = [thunk];

middlewares.push(logger);

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
