"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var PressResponder_exports = {};
__export(PressResponder_exports, {
  PressResponder: () => PressResponder
});
module.exports = __toCommonJS(PressResponder_exports);
function _class_call_check(instance, Constructor) {
  if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _create_class(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Constructor;
}
function _define_property(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
var DELAY = "DELAY",
  ERROR = "ERROR",
  LONG_PRESS_DETECTED = "LONG_PRESS_DETECTED",
  NOT_RESPONDER = "NOT_RESPONDER",
  RESPONDER_ACTIVE_LONG_PRESS_START = "RESPONDER_ACTIVE_LONG_PRESS_START",
  RESPONDER_ACTIVE_PRESS_START = "RESPONDER_ACTIVE_PRESS_START",
  RESPONDER_INACTIVE_PRESS_START = "RESPONDER_INACTIVE_PRESS_START",
  RESPONDER_GRANT = "RESPONDER_GRANT",
  RESPONDER_RELEASE = "RESPONDER_RELEASE",
  RESPONDER_TERMINATED = "RESPONDER_TERMINATED",
  Transitions = Object.freeze({
    NOT_RESPONDER: {
      DELAY: ERROR,
      RESPONDER_GRANT: RESPONDER_INACTIVE_PRESS_START,
      RESPONDER_RELEASE: ERROR,
      RESPONDER_TERMINATED: ERROR,
      LONG_PRESS_DETECTED: ERROR
    },
    RESPONDER_INACTIVE_PRESS_START: {
      DELAY: RESPONDER_ACTIVE_PRESS_START,
      RESPONDER_GRANT: ERROR,
      RESPONDER_RELEASE: NOT_RESPONDER,
      RESPONDER_TERMINATED: NOT_RESPONDER,
      LONG_PRESS_DETECTED: ERROR
    },
    RESPONDER_ACTIVE_PRESS_START: {
      DELAY: ERROR,
      RESPONDER_GRANT: ERROR,
      RESPONDER_RELEASE: NOT_RESPONDER,
      RESPONDER_TERMINATED: NOT_RESPONDER,
      LONG_PRESS_DETECTED: RESPONDER_ACTIVE_LONG_PRESS_START
    },
    RESPONDER_ACTIVE_LONG_PRESS_START: {
      DELAY: ERROR,
      RESPONDER_GRANT: ERROR,
      RESPONDER_RELEASE: NOT_RESPONDER,
      RESPONDER_TERMINATED: NOT_RESPONDER,
      LONG_PRESS_DETECTED: RESPONDER_ACTIVE_LONG_PRESS_START
    },
    ERROR: {
      DELAY: NOT_RESPONDER,
      RESPONDER_GRANT: RESPONDER_INACTIVE_PRESS_START,
      RESPONDER_RELEASE: NOT_RESPONDER,
      RESPONDER_TERMINATED: NOT_RESPONDER,
      LONG_PRESS_DETECTED: NOT_RESPONDER
    }
  }),
  isActiveSignal = function (signal) {
    return signal === RESPONDER_ACTIVE_PRESS_START || signal === RESPONDER_ACTIVE_LONG_PRESS_START;
  },
  isButtonRole = function (element) {
    return element.getAttribute("role") === "button";
  },
  isPressStartSignal = function (signal) {
    return signal === RESPONDER_INACTIVE_PRESS_START || signal === RESPONDER_ACTIVE_PRESS_START || signal === RESPONDER_ACTIVE_LONG_PRESS_START;
  },
  isTerminalSignal = function (signal) {
    return signal === RESPONDER_TERMINATED || signal === RESPONDER_RELEASE;
  },
  isValidKeyPress = function (event) {
    var key = event.key,
      target = event.target,
      role = target.getAttribute("role"),
      isSpacebar = key === " " || key === "Spacebar";
    return key === "Enter" || isSpacebar && role === "button";
  },
  DEFAULT_LONG_PRESS_DELAY_MS = 450,
  DEFAULT_PRESS_DELAY_MS = 50,
  PressResponder = /* @__PURE__ */function () {
    "use strict";

    function PressResponder2(config) {
      _class_call_check(this, PressResponder2), _define_property(this, "_touchActivatePosition", null), _define_property(this, "_pressDelayTimeout", 0), _define_property(this, "_selectionTerminated", !1), _define_property(this, "_isPointerTouch", !1), _define_property(this, "_longPressDelayTimeout", 0), _define_property(this, "_longPressDispatched", !1), _define_property(this, "_pressOutDelayTimeout", 0), _define_property(this, "_touchState", NOT_RESPONDER), _define_property(this, "_config", null), _define_property(this, "_eventHandlers", null), this.configure(config);
    }
    return _create_class(PressResponder2, [{
      key: "configure",
      value: function (config) {
        this._config = config;
      }
    }, {
      /**
      * Resets any pending timers. This should be called on unmount.
      */
      key: "reset",
      value: function () {
        this._cancelLongPressDelayTimeout(), this._cancelPressDelayTimeout(), this._cancelPressOutDelayTimeout();
      }
    }, {
      /**
      * Returns a set of props to spread into the interactive element.
      */
      key: "getEventHandlers",
      value: function () {
        return this._eventHandlers == null && (this._eventHandlers = this._createEventHandlers()), this._eventHandlers;
      }
    }, {
      key: "_createEventHandlers",
      value: function () {
        var _this = this,
          start = function (event, shouldDelay) {
            event.persist(), _this._cancelPressOutDelayTimeout(), _this._longPressDispatched = !1, _this._selectionTerminated = !1, _this._touchState = NOT_RESPONDER, _this._isPointerTouch = event.nativeEvent.type === "touchstart", _this._receiveSignal(RESPONDER_GRANT, event);
            var delayPressStart = normalizeDelay(_this._config.delayPressStart, 0, DEFAULT_PRESS_DELAY_MS);
            shouldDelay !== !1 && delayPressStart > 0 ? _this._pressDelayTimeout = setTimeout(function () {
              _this._receiveSignal(DELAY, event);
            }, delayPressStart) : _this._receiveSignal(DELAY, event);
            var delayLongPress = normalizeDelay(_this._config.delayLongPress, 10, DEFAULT_LONG_PRESS_DELAY_MS);
            _this._longPressDelayTimeout = setTimeout(function () {
              _this._handleLongPress(event);
            }, delayLongPress + delayPressStart);
          },
          end = function (event) {
            _this._receiveSignal(RESPONDER_RELEASE, event);
          },
          keyupHandler = function (event) {
            var onPress = _this._config.onPress,
              target = event.target;
            if (_this._touchState !== NOT_RESPONDER && isValidKeyPress(event)) {
              end(event), document.removeEventListener("keyup", keyupHandler);
              var role = target.getAttribute("role"),
                elementType = target.tagName.toLowerCase(),
                isNativeInteractiveElement = role === "link" || elementType === "a" || elementType === "button" || elementType === "input" || elementType === "select" || elementType === "textarea";
              onPress != null && !isNativeInteractiveElement && onPress(event);
            }
          };
        return {
          onStartShouldSetResponder: function (event) {
            var disabled = _this._config.disabled;
            return disabled && isButtonRole(event.currentTarget) && event.stopPropagation(), disabled == null ? !0 : !disabled;
          },
          onKeyDown: function (event) {
            var disabled = _this._config.disabled,
              key = event.key,
              target = event.target;
            if (!disabled && isValidKeyPress(event)) {
              _this._touchState === NOT_RESPONDER && (start(event, !1), document.addEventListener("keyup", keyupHandler));
              var role = target.getAttribute("role"),
                isSpacebarKey = key === " " || key === "Spacebar",
                _isButtonRole = role === "button" || role === "menuitem";
              isSpacebarKey && _isButtonRole && event.preventDefault(), event.stopPropagation();
            }
          },
          onResponderGrant: function (event) {
            return start(event);
          },
          onResponderMove: function (event) {
            _this._config.onPressMove != null && _this._config.onPressMove(event);
            var touch = getTouchFromResponderEvent(event);
            if (_this._touchActivatePosition != null) {
              var deltaX = _this._touchActivatePosition.pageX - touch.pageX,
                deltaY = _this._touchActivatePosition.pageY - touch.pageY;
              Math.hypot(deltaX, deltaY) > 10 && _this._cancelLongPressDelayTimeout();
            }
          },
          onResponderRelease: function (event) {
            return end(event);
          },
          onResponderTerminate: function (event) {
            event.nativeEvent.type === "selectionchange" && (_this._selectionTerminated = !0), _this._receiveSignal(RESPONDER_TERMINATED, event);
          },
          onResponderTerminationRequest: function (event) {
            var _this$_config = _this._config,
              cancelable = _this$_config.cancelable,
              disabled = _this$_config.disabled,
              onLongPress = _this$_config.onLongPress;
            return !disabled && onLongPress != null && _this._isPointerTouch && event.nativeEvent.type === "contextmenu" ? !1 : cancelable ?? !0;
          },
          // NOTE: this diverges from react-native in 3 significant ways:
          // * The `onPress` callback is not connected to the responder system (the native
          //  `click` event must be used but is dispatched in many scenarios where no pointers
          //   are on the screen.) Therefore, it's possible for `onPress` to be called without
          //   `onPress{Start,End}` being called first.
          // * The `onPress` callback is only be called on the first ancestor of the native
          //   `click` target that is using the PressResponder.
          // * The event's `nativeEvent` is a `MouseEvent` not a `TouchEvent`.
          onClick: function (event) {
            var _this$_config2 = _this._config,
              disabled = _this$_config2.disabled,
              onPress = _this$_config2.onPress;
            disabled ? isButtonRole(event.currentTarget) && event.stopPropagation() : (event.stopPropagation(), _this._longPressDispatched || _this._selectionTerminated ? event.preventDefault() : onPress != null && event.altKey === !1 && onPress(event));
          },
          // If `onLongPress` is provided and a touch pointer is being used, prevent the
          // default context menu from opening.
          onContextMenu: function (event) {
            var _this$_config3 = _this._config,
              disabled = _this$_config3.disabled,
              onLongPress = _this$_config3.onLongPress;
            disabled ? isButtonRole(event.currentTarget) && event.stopPropagation() : onLongPress != null && _this._isPointerTouch && !event.defaultPrevented && (event.preventDefault(), event.stopPropagation());
          }
        };
      }
    }, {
      /**
      * Receives a state machine signal, performs side effects of the transition
      * and stores the new state. Validates the transition as well.
      */
      key: "_receiveSignal",
      value: function (signal, event) {
        var prevState = this._touchState,
          nextState = null;
        Transitions[prevState] != null && (nextState = Transitions[prevState][signal]), !(this._touchState === NOT_RESPONDER && signal === RESPONDER_RELEASE) && (nextState == null || nextState === ERROR ? console.error(`PressResponder: Invalid signal ${signal} for state ${prevState} on responder`) : prevState !== nextState && (this._performTransitionSideEffects(prevState, nextState, signal, event), this._touchState = nextState));
      }
    }, {
      /**
      * Performs a transition between touchable states and identify any activations
      * or deactivations (and callback invocations).
      */
      key: "_performTransitionSideEffects",
      value: function (prevState, nextState, signal, event) {
        var _this = this;
        if (isTerminalSignal(signal) && (setTimeout(function () {
          _this._isPointerTouch = !1;
        }, 0), this._touchActivatePosition = null, this._cancelLongPressDelayTimeout()), isPressStartSignal(prevState) && signal === LONG_PRESS_DETECTED) {
          var onLongPress = this._config.onLongPress;
          onLongPress != null && event.nativeEvent.key == null && (onLongPress(event), this._longPressDispatched = !0);
        }
        var isPrevActive = isActiveSignal(prevState),
          isNextActive = isActiveSignal(nextState);
        if (!isPrevActive && isNextActive ? this._activate(event) : isPrevActive && !isNextActive && this._deactivate(event), isPressStartSignal(prevState) && signal === RESPONDER_RELEASE) {
          var _this$_config4 = this._config,
            _onLongPress = _this$_config4.onLongPress,
            onPress = _this$_config4.onPress;
          if (onPress != null) {
            var isPressCanceledByLongPress = _onLongPress != null && prevState === RESPONDER_ACTIVE_LONG_PRESS_START;
            isPressCanceledByLongPress || isNextActive || isPrevActive || (this._activate(event), this._deactivate(event));
          }
        }
        this._cancelPressDelayTimeout();
      }
    }, {
      key: "_activate",
      value: function (event) {
        var _this$_config5 = this._config,
          onPressChange = _this$_config5.onPressChange,
          onPressStart = _this$_config5.onPressStart,
          touch = getTouchFromResponderEvent(event);
        this._touchActivatePosition = {
          pageX: touch.pageX,
          pageY: touch.pageY
        }, onPressStart?.(event), onPressChange?.(!0);
      }
    }, {
      key: "_deactivate",
      value: function (event) {
        var _this$_config6 = this._config,
          onPressChange = _this$_config6.onPressChange,
          onPressEnd = _this$_config6.onPressEnd;
        function end() {
          onPressEnd?.(event), onPressChange?.(!1);
        }
        var delayPressEnd = normalizeDelay(this._config.delayPressEnd);
        delayPressEnd > 0 ? this._pressOutDelayTimeout = setTimeout(function () {
          end();
        }, delayPressEnd) : end();
      }
    }, {
      key: "_handleLongPress",
      value: function (event) {
        (this._touchState === RESPONDER_ACTIVE_PRESS_START || this._touchState === RESPONDER_ACTIVE_LONG_PRESS_START) && this._receiveSignal(LONG_PRESS_DETECTED, event);
      }
    }, {
      key: "_cancelLongPressDelayTimeout",
      value: function () {
        this._longPressDelayTimeout != null && (clearTimeout(this._longPressDelayTimeout), this._longPressDelayTimeout = null);
      }
    }, {
      key: "_cancelPressDelayTimeout",
      value: function () {
        this._pressDelayTimeout != null && (clearTimeout(this._pressDelayTimeout), this._pressDelayTimeout = null);
      }
    }, {
      key: "_cancelPressOutDelayTimeout",
      value: function () {
        this._pressOutDelayTimeout != null && (clearTimeout(this._pressOutDelayTimeout), this._pressOutDelayTimeout = null);
      }
    }]), PressResponder2;
  }();
function normalizeDelay(delay, min, fallback) {
  return min === void 0 && (min = 0), fallback === void 0 && (fallback = 0), Math.max(min, delay ?? fallback);
}
function getTouchFromResponderEvent(event) {
  var _event$nativeEvent = event.nativeEvent,
    changedTouches = _event$nativeEvent.changedTouches,
    touches = _event$nativeEvent.touches;
  return touches != null && touches.length > 0 ? touches[0] : changedTouches != null && changedTouches.length > 0 ? changedTouches[0] : event.nativeEvent;
}
//# sourceMappingURL=PressResponder.native.js.map
