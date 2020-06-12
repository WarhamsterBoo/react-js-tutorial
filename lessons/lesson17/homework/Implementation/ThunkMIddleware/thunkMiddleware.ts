import { ThunkMiddleware } from "redux-thunk";

export const thunkMiddleware: ThunkMiddleware = ({ dispatch, getState }) => (
  next
) => (action) => {
  return next(action);
};
