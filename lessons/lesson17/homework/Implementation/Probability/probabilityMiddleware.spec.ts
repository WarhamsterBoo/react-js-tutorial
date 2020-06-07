import { probabilityMiddleware } from "./probabilityMiddleware";
import { AnyAction } from "redux";

describe("probabilityMiddleware", () => {
  it("should execute action if it has no payload", () => {
    const next = jest.fn();
    const sut = probabilityMiddleware({
      dispatch: jest.fn(),
      getState: jest.fn(),
    });
    const action: AnyAction = { type: "SOME_ACTION" };

    sut(next)(action);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(action);
  });
});
