import { startTransition } from "./index.mjs";
describe("startTransition", () => {
  it("should call the callback directly if TAMAGUI_TARGET is not web", () => {
    process.env.TAMAGUI_TARGET = "native";
    const callback = jest.fn();
    startTransition(callback), expect(callback).toHaveBeenCalled();
  }), it("should proxy to react.startTransition if TAMAGUI_TARGET is web", () => {
    process.env.TAMAGUI_TARGET = "web";
    const callback = jest.fn();
    startTransition(callback), expect(callback).not.toHaveBeenCalled();
  });
});
//# sourceMappingURL=index.test.mjs.map
