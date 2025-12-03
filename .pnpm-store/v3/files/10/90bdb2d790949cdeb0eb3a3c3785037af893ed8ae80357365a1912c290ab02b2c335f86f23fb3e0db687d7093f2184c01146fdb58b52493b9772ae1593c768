var import_index = require("./index");
describe("startTransition", () => {
  it("should call the callback directly if TAMAGUI_TARGET is not web", () => {
    process.env.TAMAGUI_TARGET = "native";
    const callback = jest.fn();
    (0, import_index.startTransition)(callback), expect(callback).toHaveBeenCalled();
  }), it("should proxy to react.startTransition if TAMAGUI_TARGET is web", () => {
    process.env.TAMAGUI_TARGET = "web";
    const callback = jest.fn();
    (0, import_index.startTransition)(callback), expect(callback).not.toHaveBeenCalled();
  });
});
//# sourceMappingURL=index.test.js.map
