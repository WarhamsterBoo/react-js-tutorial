import {
  AnyAction,
  createAction,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { State } from "./reducer";

export type Payload = {
  data?: any | undefined;
  error?: unknown | undefined;
  probability?: number;
};

export const loading = createAction("LOADING");

export const success = createAction<Payload>("SUCCESS");

export const failure = createAction<Payload>("FAILURE");

export const fetchData = (
  url: string
): ThunkAction<Promise<void>, State, {}, AnyAction> => async (
  dispatch: ThunkDispatch<State, {}, AnyAction>
): Promise<void> => {
  dispatch(loading());

  return fetch(url)
    .then(async (result) => {
      if (result.status == 200) {
        //Probability added here just for demonstration of probabilityMiddleware
        dispatch(success({ data: await result.json(), probability: 0.5 }));
      } else {
        dispatch(failure({ error: result.statusText }));
      }
    })
    .catch((error) => {
      dispatch(failure({ error }));
    });
};
