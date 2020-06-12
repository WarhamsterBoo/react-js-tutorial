import { thunkMiddleware } from "./thunkMiddleware";

describe("thunkMiddleware", () => {
  const create = () => {
    return {
      action: jest.fn(),
      next: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(),
    };
  };

  it("should execute action", () => {
    const { next, dispatch, getState } = create();
    const action = { type: "SOMEACTION" };
    const sut = thunkMiddleware({
      dispatch,
      getState,
    });

    sut(next)(action);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(action);
  });

  it("should call action if its a thunk action with correct arguments", () => {
    const { action, next, dispatch, getState } = create();
    const sut = thunkMiddleware({
      dispatch,
      getState,
    });

    sut(next)(action);

    expect(action).toBeCalledTimes(1);
    expect(action).toBeCalledWith(dispatch, getState);
  });

  it("should not call next if action is a think action", () => {
    const { action, next, dispatch, getState } = create();
    const sut = thunkMiddleware({
      dispatch,
      getState,
    });

    sut(next)(action);

    expect(next).toBeCalledTimes(0);
  });
});
