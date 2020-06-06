import { reducer } from "./reducer";
import { loading } from "./actions";

describe("reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, { type: "SOMEINVALIDACTIONTYPE" })).toEqual({
      isLoading: false,
    });
  });

  it("should set isLoading == true when loading action dispatched", () => {
    expect(reducer({ isLoading: false }, loading())).toEqual({
      isLoading: true,
    });
  });
});
