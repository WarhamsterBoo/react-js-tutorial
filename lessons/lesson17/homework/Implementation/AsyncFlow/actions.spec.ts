import { AnyAction } from "@reduxjs/toolkit";
import { enableFetchMocks } from "jest-fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { failure, fetchData, loading, success } from "./actions";
import { State } from "./reducer";

// These tests are kind of trivial. They are here jsut for the education purposes
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
  beforeAll(() => {
    enableFetchMocks();
  });

  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("should dispatch LOADING + SUCCESS actions when fetch completed successfully", async () => {
    const store = mockStore({
      isLoading: false,
      data: undefined,
      error: undefined,
    });

    fetchMock.mockResponse(JSON.stringify({ id: 1 }));

    await store
      .dispatch(fetchData("http://example.com/data"))
      .then(() =>
        expect(store.getActions()).toEqual([
          loading(),
          success({ data: { id: 1 }, error: undefined, probability: 0.5 }),
        ])
      );
  });

  it("should dispatch LOADING + FAILURE actions when fetch completed with errors", async () => {
    const store = mockStore({
      isLoading: false,
      data: undefined,
      error: undefined,
    });

    fetchMock.mockResponseOnce(() => {
      return new Promise(() => {
        throw "something went wrong";
      });
    });

    await store
      .dispatch(fetchData("http://example.com/data"))
      .then(() =>
        expect(store.getActions()).toEqual([
          loading(),
          failure({ error: "something went wrong" }),
        ])
      );
  });

  it("should dispatch LOADING + FAILURE actions when fetch is not completed with 200", async () => {
    const store = mockStore({
      isLoading: false,
      data: undefined,
      error: undefined,
    });

    fetchMock.mockResponse("http://example.com/data", {
      status: 404,
      statusText: "not found",
    });

    await store
      .dispatch(fetchData("http://example.com/data"))
      .then(() =>
        expect(store.getActions()).toEqual([
          loading(),
          failure({ error: "not found" }),
        ])
      );
  });
});
