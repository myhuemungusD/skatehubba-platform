import { handleNativeError, NotSupportedError } from './PasskeyError';
import { Platform } from 'react-native';
import { NativePasskey } from './NativePasskey';
export class Passkey {
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
      throw NotSupportedError;
    }
    try {
      const response = await NativePasskey.create(JSON.stringify(request), false,
      // forcePlatformKey
      false // forceSecurityKey
      );
      if (typeof response === 'string') {
        return JSON.parse(response);
      }
      return response;
    } catch (error) {
      throw handleNativeError(error);
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
      throw NotSupportedError;
    }
    try {
      const response = await NativePasskey.create(JSON.stringify(request), true,
      // forcePlatformKey
      false // forceSecurityKey
      );
      if (typeof response === 'string') {
        return JSON.parse(response);
      }
      return response;
    } catch (error) {
      throw handleNativeError(error);
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
      throw NotSupportedError;
    }
    try {
      const response = await NativePasskey.create(JSON.stringify(request), false,
      // forcePlatformKey
      true // forceSecurityKey
      );
      if (typeof response === 'string') {
        return JSON.parse(response);
      }
      return response;
    } catch (error) {
      throw handleNativeError(error);
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
      throw NotSupportedError;
    }
    try {
      const response = await NativePasskey.get(JSON.stringify(request), false,
      // forcePlatformKey
      false // forceSecurityKey
      );
      if (typeof response === 'string') {
        return JSON.parse(response);
      }
      return response;
    } catch (error) {
      throw handleNativeError(error);
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
      throw NotSupportedError;
    }
    try {
      const response = await NativePasskey.get(JSON.stringify(request), true,
      // forcePlatformKey
      false // forceSecurityKey
      );
      if (typeof response === 'string') {
        return JSON.parse(response);
      }
      return response;
    } catch (error) {
      throw handleNativeError(error);
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
      throw NotSupportedError;
    }
    try {
      const response = await NativePasskey.get(JSON.stringify(request), false,
      // forcePlatformKey
      true // forceSecurityKey
      );
      if (typeof response === 'string') {
        return JSON.parse(response);
      }
      return response;
    } catch (error) {
      throw handleNativeError(error);
    }
  }

  /**
   * Checks if Passkeys are supported on the current device
   *
   * @returns A boolean indicating whether Passkeys are supported
   */
  static isSupported() {
    if (Platform.OS === 'android') {
      return Platform.Version > 28;
    }
    if (Platform.OS === 'ios') {
      return parseInt(Platform.Version, 10) >= 15;
    }
    return false;
  }
}
//# sourceMappingURL=Passkey.js.map