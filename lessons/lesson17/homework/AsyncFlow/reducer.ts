import { createReducer } from "@reduxjs/toolkit";
import { loading } from "./actions";

export type State = {
  isLoading: true;
};

const initialState = {
  isLoading: false,
};

export const reducer = createReducer(initialState, {
  [loading.type]: (state) => ({ ...state, isLoading: true }),
});
