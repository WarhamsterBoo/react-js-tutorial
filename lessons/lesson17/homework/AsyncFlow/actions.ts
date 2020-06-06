import { createAction } from "@reduxjs/toolkit";

export type Payload = {
  data: any | undefined;
  error?: unknown | undefined;
};

export const loading = createAction("LOADING");
export const success = createAction<Payload>("SUCCESS");
export const failure = createAction<Payload>("FAILURE");
