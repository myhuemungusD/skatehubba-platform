"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Passkey = void 0;
var _PasskeyError = require("./PasskeyError");
var _reactNative = require("react-native");
var _NativePasskey = require("./NativePasskey");
class Passkey {
  /**
   * Creates a new Passkey
   *
   * @param request The FIDO2 Attestation Request in JSON format
   * @param options An object containing options for the registration process
   * @returns The FIDO2 Attestation Result in JSON format
   * @throws
   */
  static async create(request) {
    if (!Passkey.isSupported()) {
      throw _PasskeyError.NotSupportedError;
    }
    try {
      const response = await _NativePasskey.NativePasskey.create(JSON.stringify(request), false,
      // forcePlatformKey
      false // forceSecurityKey
      );
      if (typeof response === 'string') {
        return JSON.parse(response);
      }
      return response;
    } catch (error) {
      throw (0, _PasskeyError.handleNativeError)(error);
    }
  }

  /**
   * Creates a new Passkey
   * Forces the usage of a platform authenticator on iOS
   *
   * @param request The FIDO2 Attestation Request in JSON format
   * @param options An object containing options for the registration process
   * @returns The FIDO2 Attestation Result in JSON format
   * @throws
   */
  static async createPlatformKey(request) {
    if (!Passkey.isSupported()) {
      throw _PasskeyError.NotSupportedError;
    }
    try {
      const response = await _NativePasskey.NativePasskey.create(JSON.stringify(request), true,
      // forcePlatformKey
      false // forceSecurityKey
      );
      if (typeof response === 'string') {
        return JSON.parse(response);
      }
      return response;
    } catch (error) {
      throw (0, _PasskeyError.handleNativeError)(error);
    }
  }

  /**
   * Creates a new Passkey
   * Forces the usage of a security authenticator on iOS
   *
   * @param request The FIDO2 Attestation Request in JSON format
   * @param options An object containing options for the registration process
   * @returns The FIDO2 Attestation Result in JSON format
   * @throws
   */
  static async createSecurityKey(request) {
    if (!Passkey.isSupported()) {
      throw _PasskeyError.NotSupportedError;
    }
    try {
      const response = await _NativePasskey.NativePasskey.create(JSON.stringify(request), false,
      // forcePlatformKey
      true // forceSecurityKey
      );
      if (typeof response === 'string') {
        return JSON.parse(response);
      }
      return response;
    } catch (error) {
      throw (0, _PasskeyError.handleNativeError)(error);
    }
  }

  /**
   * Authenticates using an existing Passkey
   *
   * @param request The FIDO2 Assertion Request in JSON format
   * @param options An object containing options for the authentication process
   * @returns The FIDO2 Assertion Result in JSON format
   * @throws
   */
  static async get(request) {
    if (!Passkey.isSupported()) {
      throw _PasskeyError.NotSupportedError;
    }
    try {
      const response = await _NativePasskey.NativePasskey.get(JSON.stringify(request), false,
      // forcePlatformKey
      false // forceSecurityKey
      );
      if (typeof response === 'string') {
        return JSON.parse(response);
      }
      return response;
    } catch (error) {
      throw (0, _PasskeyError.handleNativeError)(error);
    }
  }

  /**
   * Authenticates using an existing Passkey
   * Forces the usage of a platform authenticator on iOS
   *
   * @param request The FIDO2 Assertion Request in JSON format
   * @param options An object containing options for the authentication process
   * @returns The FIDO2 Assertion Result in JSON format
   * @throws
   */
  static async getPlatformKey(request) {
    if (!Passkey.isSupported()) {
      throw _PasskeyError.NotSupportedError;
    }
    try {
      const response = await _NativePasskey.NativePasskey.get(JSON.stringify(request), true,
      // forcePlatformKey
      false // forceSecurityKey
      );
      if (typeof response === 'string') {
        return JSON.parse(response);
      }
      return response;
    } catch (error) {
      throw (0, _PasskeyError.handleNativeError)(error);
    }
  }

  /**
   * Authenticates using an existing Passkey
   * Forces the usage of a security authenticator on iOS
   *
   * @param request The FIDO2 Assertion Request in JSON format
   * @param options An object containing options for the authentication process
   * @returns The FIDO2 Assertion Result in JSON format
   * @throws
   */
  static async getSecurityKey(request) {
    if (!Passkey.isSupported()) {
      throw _PasskeyError.NotSupportedError;
    }
    try {
      const response = await _NativePasskey.NativePasskey.get(JSON.stringify(request), false,
      // forcePlatformKey
      true // forceSecurityKey
      );
      if (typeof response === 'string') {
        return JSON.parse(response);
      }
      return response;
    } catch (error) {
      throw (0, _PasskeyError.handleNativeError)(error);
    }
  }

  /**
   * Checks if Passkeys are supported on the current device
   *
   * @returns A boolean indicating whether Passkeys are supported
   */
  static isSupported() {
    if (_reactNative.Platform.OS === 'android') {
      return _reactNative.Platform.Version > 28;
    }
    if (_reactNative.Platform.OS === 'ios') {
      return parseInt(_reactNative.Platform.Version, 10) >= 15;
    }
    return false;
  }
}
exports.Passkey = Passkey;
//# sourceMappingURL=Passkey.js.map