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
    .then((result) => result.json())
    .then((data) => {
      dispatch(success({ data }));
    });
};
