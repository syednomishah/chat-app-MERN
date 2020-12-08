import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
const middleware = [thunk];
const initState = {};
const store = createStore(
  rootReducer,
  initState,
  compose(
    applyMiddleware(...middleware),
  )
);
//reducer,initstate,middleware
export default store;
