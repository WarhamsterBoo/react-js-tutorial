import { reducer } from "./reducer";
import { loading, success } from "./actions";

describe("reducer", () => {
  const defaultState = {
    isLoading: false,
    data: undefined,
    error: undefined,
  };

  it("should return initial state", () => {
    expect(reducer(undefined, { type: "SOMEINVALIDACTIONTYPE" })).toEqual({
      isLoading: false,
    });
  });

  it("should set isLoading == true when loading action dispatched", () => {
    expect(reducer(defaultState, loading())).toEqual({
      isLoading: true,
    });
  });

  it("should set data and isLoading false when succes action dispatched", () => {
    const payload = { data: { id: 1 } };

    expect(reducer(defaultState, success(payload))).toEqual({
      isLoading: false,
      data: payload.data,
    });
  });
});
