import { reducer } from "./reducer";
import { loading, success, failure, Payload } from "./actions";

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

  it("should set data and isLoading == false when succes action dispatched", () => {
    const payload = { data: { id: 1 } };

    expect(
      reducer({ ...defaultState, isLoading: true }, success(payload))
    ).toEqual({
      isLoading: false,
      data: payload.data,
    });
  });

  it("should clear error if success action dispatched", () => {
    const payload = { data: { id: 1 } };

    expect(
      reducer(
        {
          isLoading: true,
          data: undefined,
          error: { message: "something went wrong" },
        },
        success(payload)
      ).error
    ).toBeUndefined();
  });

  it("should set error and isLoading == false when failure action dispatched", () => {
    const payload: Payload = {
      error: { message: "something went worong" },
    };

    expect(
      reducer({ ...defaultState, isLoading: true }, failure(payload))
    ).toEqual({
      isLoading: false,
      error: payload.error,
    });
  });
});
