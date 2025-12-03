"use strict";

var import_index = require("./index.native.js");
describe("startTransition", function () {
  it("should call the callback directly if TAMAGUI_TARGET is not web", function () {
    process.env.TAMAGUI_TARGET = "native";
    var callback = jest.fn();
    (0, import_index.startTransition)(callback), expect(callback).toHaveBeenCalled();
  }), it("should proxy to react.startTransition if TAMAGUI_TARGET is web", function () {
    process.env.TAMAGUI_TARGET = "web";
    var callback = jest.fn();
    (0, import_index.startTransition)(callback), expect(callback).not.toHaveBeenCalled();
  });
});
//# sourceMappingURL=index.test.native.js.map
