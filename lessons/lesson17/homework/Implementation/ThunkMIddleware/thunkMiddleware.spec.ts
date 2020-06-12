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

  it("should call action if its a thunk action with correct arguments", () => {
    const action = jest.fn();
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = jest.fn();
    const sut = thunkMiddleware({
      dispatch,
      getState,
    });

    sut(next)(action);

    expect(action).toBeCalledTimes(1);
    expect(action).toBeCalledWith(dispatch, getState);
  });

  it("should not call next if action is a think action", () => {
    const action = jest.fn();
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = jest.fn();
    const sut = thunkMiddleware({
      dispatch,
      getState,
    });

    sut(next)(action);

    expect(next).toBeCalledTimes(0);
  });
});
