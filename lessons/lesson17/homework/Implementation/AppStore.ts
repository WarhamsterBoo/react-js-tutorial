import { createStore, applyMiddleware } from "redux";
import { reducer } from "./AsyncFlow/reducer";
import thunk from "redux-thunk";
import { probabilityMiddleware } from "./Probability/probabilityMiddleware";

export const AppStore = createStore(
  reducer,
  applyMiddleware(thunk, probabilityMiddleware)
);
