import { Middleware, AnyAction } from "redux";

export const probabilityMiddleware: Middleware = () => (next) => (
  action: AnyAction
) => {
  return next(action);
};
