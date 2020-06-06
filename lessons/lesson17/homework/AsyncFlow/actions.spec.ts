import { AnyAction } from "@reduxjs/toolkit";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { failure, fetchData, loading, success } from "./actions";
import { State } from "./reducer";

// These tests are kind of trivial. They are here for the education purposes
describe("sync action creators", () => {
  it("should create action to set loading", () => {
    expect(loading()).toEqual({
      type: "LOADING",
      payload: undefined,
    });
  });

  it("should create action to note fetching success", () => {
    const payload = { data: 1, error: undefined };

    expect(success(payload)).toEqual({
      type: "SUCCESS",
      payload,
    });
  });

  it("should create action to note fetching error", () => {
    const payload = { data: undefined, error: "something went wrong" };

    expect(failure(payload)).toEqual({
      type: "FAILURE",
      payload,
    });
  });
});

const mockStore = configureMockStore<
  State,
  ThunkDispatch<State, {}, AnyAction>
>([thunk]);

describe("async action creators", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should dispatch LOADING + SUCCESS actions when fetch completed successfully", async () => {
    const store = mockStore({
      isLoading: false,
      data: undefined,
      error: undefined,
    });

    fetchMock.getOnce("http://example.com/data", {
      body: { id: 1 },
      headers: { "content-type": "application/json" },
    });

    await store
      .dispatch(fetchData("http://example.com/data"))
      .then(() =>
        expect(store.getActions()).toEqual([
          loading(),
          success({ data: { id: 1 }, error: undefined }),
        ])
      );
  });
});
