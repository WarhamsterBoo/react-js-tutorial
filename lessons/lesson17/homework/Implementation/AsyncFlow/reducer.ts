import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { loading, success, Payload, failure } from "./actions";

export type State = {
  isLoading: boolean;
  data: any | undefined;
  error: any | undefined;
};

const initialState: State = {
  isLoading: false,
  data: undefined,
  error: undefined,
};

export const reducer = createReducer<State>(initialState, {
  [loading.type]: (state: State) => ({ ...state, isLoading: true }),
  [success.type]: (_, action: PayloadAction<Payload>) => ({
    isLoading: false,
    data: action.payload.data,
    error: undefined,
  }),
  [failure.type]: (_, action: PayloadAction<Payload>) => ({
    isLoading: false,
    data: undefined,
    error: action.payload.error,
  }),
});
