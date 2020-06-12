import { applyMiddleware, createStore } from "redux";
import { reducer } from "./AsyncFlow/reducer";
import { probabilityMiddleware } from "./Probability/probabilityMiddleware";
import { thunkMiddleware } from "./ThunkMIddleware/thunkMiddleware";

export const AppStore = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, probabilityMiddleware)
);
