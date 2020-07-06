import { ThunkMiddleware } from "redux-thunk";

export const thunkMiddleware: ThunkMiddleware = ({ dispatch, getState }) => (
  next
) => (action) => {
  if (typeof action === "function") {
    return action(dispatch, getState);
  }
  return next(action);
};
