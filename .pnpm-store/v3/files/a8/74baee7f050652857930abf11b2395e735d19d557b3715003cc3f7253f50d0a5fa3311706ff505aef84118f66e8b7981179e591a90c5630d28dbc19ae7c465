function timer() {
  var runs = 0,
    typesOfRuns = /* @__PURE__ */new Set(),
    timings = {};
  function print() {
    var typeRuns = runs / typesOfRuns.size,
      totalTime = 0,
      out = [`Ran ${typeRuns} per-type, ${runs} total`, ...[...typesOfRuns].map(function (name) {
        if (!name.endsWith("(ignore)")) {
          var avg = `avg ${`${timings[name] / typeRuns}`.slice(0, 9).padEnd(9)}ms`,
            total = timings[name];
          return totalTime += total, `${name.slice(0, 30).padStart(31)} | ${avg} | total ${total}ms`;
        }
      }), `                                    total ${totalTime}ms`].join(`
`);
    return console.info(out), out;
  }
  return {
    start(opts) {
      var _opts_quiet,
        quiet = (_opts_quiet = opts?.quiet) !== null && _opts_quiet !== void 0 ? _opts_quiet : !0;
      function time(strings) {
        for (var _len = arguments.length, vars = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) vars[_key - 1] = arguments[_key];
        var _timings,
          _tag,
          elapsed = performance.now() - start,
          tag = templateToString(strings, ...vars);
        typesOfRuns.add(tag), runs++;
        var _;
        if ((_ = (_timings = timings)[_tag = tag]) !== null && _ !== void 0 || (_timings[_tag] = 0), timings[tag] += elapsed, !quiet) {
          var result = "";
          strings.forEach(function (str, i) {
            result += `${str}${i === strings.length - 1 ? "" : vars[i]}`;
          }), console.info(`${`${elapsed}ms`.slice(0, 6).padStart(7)} |`, result);
        }
        start = performance.now();
      }
      var start = performance.now();
      return time.print = print, time;
    },
    profile() {
      return {
        timings,
        runs
      };
    },
    print
  };
}
function templateToString(strings) {
  for (var _len = arguments.length, vars = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) vars[_key - 1] = arguments[_key];
  return strings.reduce(function (result, str, i) {
    return result + str + (vars[i] !== void 0 ? vars[i] : "");
  }, "");
}
export { timer };
//# sourceMappingURL=index.native.js.map
