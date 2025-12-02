function proxyThemeVariables(obj) {
  return new Proxy(obj || {}, {
    has(target, key) {
      return Reflect.has(target, removeStarting$(key));
    },
    get(target, key) {
      return Reflect.get(target, removeStarting$(key));
    }
  });
}
const removeStarting$ = (str) => typeof str == "string" && str[0] === "$" ? str.slice(1) : str;
export {
  proxyThemeVariables
};
//# sourceMappingURL=proxyThemeVariables.js.map
