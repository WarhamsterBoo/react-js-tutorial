import { reducer } from "./reducer";

describe("reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, { type: "SOMEINVALIDACTIONTYPE" })).toEqual({
      isLoading: false,
    });
  });
});
