import { Middleware, AnyAction } from "redux";

export const probabilityMiddleware: Middleware = () => (next) => (
  action: AnyAction
) => {
  if (action.payload && action.payload.probability >= 0) {
    return action;
  }
  return next(action);
};
