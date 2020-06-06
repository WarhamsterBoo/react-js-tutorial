import { loading } from "./actions";

describe("action creators", () => {
  it("should create action to set loading", () => {
    expect(loading()).toEqual({
      type: "LOADING",
      payload: undefined,
    });
  });
});
