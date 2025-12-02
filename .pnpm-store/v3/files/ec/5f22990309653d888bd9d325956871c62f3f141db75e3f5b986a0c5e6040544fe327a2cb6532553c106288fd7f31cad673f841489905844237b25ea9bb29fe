import { startTransition } from "./index.native.js";
describe("startTransition", function () {
  it("should call the callback directly if TAMAGUI_TARGET is not web", function () {
    process.env.TAMAGUI_TARGET = "native";
    var callback = jest.fn();
    startTransition(callback), expect(callback).toHaveBeenCalled();
  }), it("should proxy to react.startTransition if TAMAGUI_TARGET is web", function () {
    process.env.TAMAGUI_TARGET = "web";
    var callback = jest.fn();
    startTransition(callback), expect(callback).not.toHaveBeenCalled();
  });
});
//# sourceMappingURL=index.test.native.js.map
