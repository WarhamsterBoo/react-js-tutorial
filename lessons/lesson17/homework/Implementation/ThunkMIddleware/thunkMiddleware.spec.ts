import { thunkMiddleware } from "./thunkMiddleware";

describe("thunkMiddleware", () => {
  it("should execute action", () => {
    const action = { type: "SOMEACTION" };
    const next = jest.fn();
    const sut = thunkMiddleware({
      dispatch: jest.fn(),
      getState: jest.fn(),
    });

    sut(next)(action);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(action);
  });
});
