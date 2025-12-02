function _assert_this_initialized(self) {
  if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self;
}
function _call_super(_this, derived, args) {
  return derived = _get_prototype_of(derived), _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check(instance, Constructor) {
  if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _construct(Parent, args, Class) {
  return _is_native_reflect_construct() ? _construct = Reflect.construct : _construct = function (Parent2, args2, Class2) {
    var a = [null];
    a.push.apply(a, args2);
    var Constructor = Function.bind.apply(Parent2, a),
      instance = new Constructor();
    return Class2 && _set_prototype_of(instance, Class2.prototype), instance;
  }, _construct.apply(null, arguments);
}
function _get_prototype_of(o) {
  return _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function (o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: !0,
      configurable: !0
    }
  }), superClass && _set_prototype_of(subClass, superClass);
}
function _is_native_function(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _possible_constructor_return(self, call) {
  return call && (_type_of(call) === "object" || typeof call == "function") ? call : _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
  return _set_prototype_of = Object.setPrototypeOf || function (o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _set_prototype_of(o, p);
}
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _wrap_native_super(Class) {
  var _cache = typeof Map == "function" ? /* @__PURE__ */new Map() : void 0;
  return _wrap_native_super = function (Class2) {
    if (Class2 === null || !_is_native_function(Class2)) return Class2;
    if (typeof Class2 != "function") throw new TypeError("Super expression must either be null or a function");
    if (typeof _cache < "u") {
      if (_cache.has(Class2)) return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _get_prototype_of(this).constructor);
    }
    return Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), _set_prototype_of(Wrapper, Class2);
  }, _wrap_native_super(Class);
}
function _is_native_reflect_construct() {
  try {
    var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (_is_native_reflect_construct = function () {
    return !!result;
  })();
}
var AbortError = /* @__PURE__ */function (Error1) {
  "use strict";

  _inherits(AbortError2, Error1);
  function AbortError2() {
    var message = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    _class_call_check(this, AbortError2);
    var _this;
    return _this = _call_super(this, AbortError2, [message]), _this.name = "AbortError", _this;
  }
  return AbortError2;
}(_wrap_native_super(Error));
export { AbortError };
//# sourceMappingURL=errors.native.js.map
