import type { PasskeyCreateRequest, PasskeyCreateResult, PasskeyGetRequest, PasskeyGetResult } from './PasskeyTypes';
export declare class Passkey {
    /**
     * Creates a new Passkey
     *
     * @param request The FIDO2 Attestation Request in JSON format
     * @param options An object containing options for the registration process
     * @returns The FIDO2 Attestation Result in JSON format
     * @throws
     */
    static create(request: PasskeyCreateRequest): Promise<PasskeyCreateResult>;
    /**
     * Creates a new Passkey
     * Forces the usage of a platform authenticator on iOS
     *
     * @param request The FIDO2 Attestation Request in JSON format
     * @param options An object containing options for the registration process
     * @returns The FIDO2 Attestation Result in JSON format
     * @throws
     */
    static createPlatformKey(request: PasskeyCreateRequest): Promise<PasskeyCreateResult>;
    /**
     * Creates a new Passkey
     * Forces the usage of a security authenticator on iOS
     *
     * @param request The FIDO2 Attestation Request in JSON format
     * @param options An object containing options for the registration process
     * @returns The FIDO2 Attestation Result in JSON format
     * @throws
     */
    static createSecurityKey(request: PasskeyCreateRequest): Promise<PasskeyCreateResult>;
    /**
     * Authenticates using an existing Passkey
     *
     * @param request The FIDO2 Assertion Request in JSON format
     * @param options An object containing options for the authentication process
     * @returns The FIDO2 Assertion Result in JSON format
     * @throws
     */
    static get(request: PasskeyGetRequest): Promise<PasskeyGetResult>;
    /**
     * Authenticates using an existing Passkey
     * Forces the usage of a platform authenticator on iOS
     *
     * @param request The FIDO2 Assertion Request in JSON format
     * @param options An object containing options for the authentication process
     * @returns The FIDO2 Assertion Result in JSON format
     * @throws
     */
    static getPlatformKey(request: PasskeyGetRequest): Promise<PasskeyGetResult>;
    /**
     * Authenticates using an existing Passkey
     * Forces the usage of a security authenticator on iOS
     *
     * @param request The FIDO2 Assertion Request in JSON format
     * @param options An object containing options for the authentication process
     * @returns The FIDO2 Assertion Result in JSON format
     * @throws
     */
    static getSecurityKey(request: PasskeyGetRequest): Promise<PasskeyGetResult>;
    /**
     * Checks if Passkeys are supported on the current device
     *
     * @returns A boolean indicating whether Passkeys are supported
     */
    static isSupported(): boolean;
}
//# sourceMappingURL=Passkey.d.ts.map