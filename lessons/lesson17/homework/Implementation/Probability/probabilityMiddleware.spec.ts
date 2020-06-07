import { probabilityMiddleware } from "./probabilityMiddleware";

describe("probabilityMiddleware", () => {
  it.each`
    action
    ${{ type: "SOME_ACTION" }}
    ${{ type: "SOME_ACTION", payload: { id: 1 } }}
  `(
    "should execute action if it has no probability in payload",
    ({ action }) => {
      const next = jest.fn();
      const sut = probabilityMiddleware({
        dispatch: jest.fn(),
        getState: jest.fn(),
      });

      sut(next)(action);

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(action);
    }
  );

  it("should not execute aciton if probability is equal to 0", () => {
    const next = jest.fn();
    const sut = probabilityMiddleware({
      dispatch: jest.fn(),
      getState: jest.fn(),
    });
    const action = { type: "SOME_ACTION", payload: { probability: 0 } };

    sut(next)(action);

    expect(next).toBeCalledTimes(0);
  });
});
