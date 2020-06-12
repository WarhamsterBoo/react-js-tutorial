import { ThunkMiddleware } from "redux-thunk";

export const thunkMiddleware: ThunkMiddleware = ({ dispatch, getState }) => (
  next
) => (action) => {
  if (typeof action === "function") {
    action(dispatch, getState);
    return action;
  }
  return next(action);
};
