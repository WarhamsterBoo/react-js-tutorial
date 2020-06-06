import { failure, loading, success } from "./actions";

describe("action creators", () => {
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
