import { Middleware, AnyAction } from "redux";

export const probabilityMiddleware: Middleware = () => (next) => (
  action: AnyAction
) => {
  const noProbabilityInAction = !(
    action.payload && action.payload.probability >= 0
  );

  const needToDispatchAction =
    noProbabilityInAction || Math.random() < action.payload.probability;

  if (needToDispatchAction) {
    return next(action);
  }

  return action;
};
