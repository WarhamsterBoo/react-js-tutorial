import { probabilityMiddleware } from "./probabilityMiddleware";

describe("probabilityMiddleware", () => {
  const create = () => {
    return {
      action: jest.fn(),
      next: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(),
    };
  };

  it.each`
    action
    ${{ type: "SOME_ACTION" }}
    ${{ type: "SOME_ACTION", payload: { id: 1 } }}
  `(
    "should execute action if it has no probability in payload",
    ({ action }) => {
      const { next, dispatch, getState } = create();
      const sut = probabilityMiddleware({
        dispatch,
        getState,
      });

      sut(next)(action);

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(action);
    }
  );

  it("should not execute aciton if probability is equal to 0", () => {
    const { next, dispatch, getState } = create();
    const sut = probabilityMiddleware({
      dispatch,
      getState,
    });
    const action = { type: "SOME_ACTION", payload: { probability: 0 } };

    sut(next)(action);

    expect(next).toBeCalledTimes(0);
  });

  it("should execute aciton if probability is equal to 1", () => {
    const { next, dispatch, getState } = create();
    const sut = probabilityMiddleware({
      dispatch,
      getState,
    });
    const action = { type: "SOME_ACTION", payload: { probability: 1 } };

    sut(next)(action);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(action);
  });

  it("should consider probability when executing action", () => {
    const { next, dispatch, getState } = create();
    const sut = probabilityMiddleware({
      dispatch,
      getState,
    });
    const action = { type: "SOME_ACTION", payload: { probability: 0.5 } };
    Math.random = jest.fn().mockReturnValueOnce(0.1).mockReturnValueOnce(0.9);

    sut(next)(action);
    sut(next)(action);

    expect(next).toBeCalledTimes(1);
  });
});
