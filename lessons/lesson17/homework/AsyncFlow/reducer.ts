import { createReducer } from "@reduxjs/toolkit";

export type State = {
  isLoading: true;
};

const initialState = {
  isLoading: false,
};

export const reducer = createReducer(initialState, {
  loading: (state) => state,
});
