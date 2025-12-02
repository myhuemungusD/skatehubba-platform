import { getTokens, isVariable } from "@tamagui/web";
var defaultOptions = {
    shift: 0,
    bounds: [0]
  },
  getSize = function (size, options) {
    return getTokenRelative("size", size, options);
  },
  getSpace = function (space, options) {
    return getTokenRelative("space", space, options);
  },
  getRadius = function (radius, options) {
    return getTokenRelative("radius", radius, options);
  },
  cacheVariables = {},
  cacheWholeVariables = {},
  cacheKeys = {},
  cacheWholeKeys = {},
  stepTokenUpOrDown = function (type, current) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultOptions,
      _options_bounds,
      _options_bounds1,
      tokens = getTokens({
        prefixed: !0
      })[type];
    if (!(type in cacheVariables)) {
      cacheKeys[type] = [], cacheVariables[type] = [], cacheWholeKeys[type] = [], cacheWholeVariables[type] = [];
      var sorted = Object.keys(tokens).map(function (k) {
          return tokens[k];
        }).sort(function (a, b) {
          return a.val - b.val;
        }),
        _iteratorNormalCompletion = !0,
        _didIteratorError = !1,
        _iteratorError = void 0;
      try {
        for (var _iterator = sorted[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
          var token = _step.value;
          cacheKeys[type].push(token.key), cacheVariables[type].push(token);
        }
      } catch (err) {
        _didIteratorError = !0, _iteratorError = err;
      } finally {
        try {
          !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
        } finally {
          if (_didIteratorError) throw _iteratorError;
        }
      }
      var sortedExcludingHalfSteps = sorted.filter(function (x) {
          return !x.key.endsWith(".5");
        }),
        _iteratorNormalCompletion1 = !0,
        _didIteratorError1 = !1,
        _iteratorError1 = void 0;
      try {
        for (var _iterator1 = sortedExcludingHalfSteps[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = !0) {
          var token1 = _step1.value;
          cacheWholeKeys[type].push(token1.key), cacheWholeVariables[type].push(token1);
        }
      } catch (err) {
        _didIteratorError1 = !0, _iteratorError1 = err;
      } finally {
        try {
          !_iteratorNormalCompletion1 && _iterator1.return != null && _iterator1.return();
        } finally {
          if (_didIteratorError1) throw _iteratorError1;
        }
      }
    }
    var isString = typeof current == "string",
      cache = options.excludeHalfSteps ? isString ? cacheWholeKeys : cacheWholeVariables : isString ? cacheKeys : cacheVariables,
      tokensOrdered = cache[type],
      _options_bounds_,
      min = (_options_bounds_ = (_options_bounds = options.bounds) === null || _options_bounds === void 0 ? void 0 : _options_bounds[0]) !== null && _options_bounds_ !== void 0 ? _options_bounds_ : 0,
      _options_bounds_1,
      max = (_options_bounds_1 = (_options_bounds1 = options.bounds) === null || _options_bounds1 === void 0 ? void 0 : _options_bounds1[1]) !== null && _options_bounds_1 !== void 0 ? _options_bounds_1 : tokensOrdered.length - 1,
      currentIndex = tokensOrdered.indexOf(current),
      shift = options.shift || 0;
    shift && (current === "$true" || isVariable(current) && current.name === "true") && (shift += shift > 0 ? 1 : -1);
    var index = Math.min(max, Math.max(min, currentIndex + shift)),
      found = tokensOrdered[index],
      result = (typeof found == "string" ? tokens[found] : found) || tokens.$true;
    return result;
  },
  getTokenRelative = stepTokenUpOrDown;
export { getRadius, getSize, getSpace, getTokenRelative, stepTokenUpOrDown };
//# sourceMappingURL=index.native.js.map
