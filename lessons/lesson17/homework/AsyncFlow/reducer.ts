import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { loading, success, Payload, failure } from "./actions";

export type State = {
  isLoading: true;
  data: any | undefined;
};

const initialState = {
  isLoading: false,
  data: undefined,
};

export const reducer = createReducer(initialState, {
  [loading.type]: (state) => ({ ...state, isLoading: true }),
  [success.type]: (state, action: PayloadAction<Payload>) => ({
    ...state,
    data: action.payload.data,
    isLoading: false,
  }),
  [failure.type]: (state, action: PayloadAction<Payload>) => ({
    ...state,
    error: action.payload.error,
    isLoading: false,
  }),
});
