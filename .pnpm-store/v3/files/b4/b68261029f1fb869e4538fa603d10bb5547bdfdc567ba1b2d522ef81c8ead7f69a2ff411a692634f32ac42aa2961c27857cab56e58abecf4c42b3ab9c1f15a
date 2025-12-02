"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserCancelledError = exports.UnknownError = exports.TimeoutError = exports.RequestFailedError = exports.NotSupportedError = exports.NoCredentialsError = exports.NativeError = exports.InvalidUserIdError = exports.InvalidChallengeError = exports.InterruptedError = exports.BadConfiguration = void 0;
exports.handleNativeError = handleNativeError;
const UnknownError = exports.UnknownError = {
  error: 'Unknown error',
  message: 'An unknown error occurred'
};
const NotSupportedError = exports.NotSupportedError = {
  error: 'NotSupported',
  message: 'Passkeys are not supported on this device. iOS 15 or Android SDK 28 and above is required to use Passkeys'
};
const RequestFailedError = exports.RequestFailedError = {
  error: 'RequestFailed',
  message: 'The request failed. No Credentials were returned.'
};
const UserCancelledError = exports.UserCancelledError = {
  error: 'UserCancelled',
  message: 'The user cancelled the request.'
};
const InvalidChallengeError = exports.InvalidChallengeError = {
  error: 'InvalidChallenge',
  message: 'The provided challenge was invalid'
};
const InvalidUserIdError = exports.InvalidUserIdError = {
  error: 'InvalidUserId',
  message: 'The provided userId was invalid'
};
const BadConfiguration = exports.BadConfiguration = {
  error: 'BadConfiguration',
  message: 'Your app is not properly configured. Refer to the docs for help.'
};
const NoCredentialsError = exports.NoCredentialsError = {
  error: 'NoCredentials',
  message: 'No viable credential is available for the user.'
};
const InterruptedError = exports.InterruptedError = {
  error: 'Interrupted',
  message: 'The operation was interrupted and may be retried.'
};
const TimeoutError = exports.TimeoutError = {
  error: 'TimedOut',
  message: 'The operation timed out.'
};
const NativeError = (message = 'An unknown error occurred') => {
  return {
    error: 'Native error',
    message: message
  };
};
exports.NativeError = NativeError;
function handleNativeError(_error) {
  if (!_error.code) {
    return UnknownError;
  }
  switch (_error.code) {
    case 'NotSupported':
      {
        return NotSupportedError;
      }
    case 'RequestFailed':
      {
        return RequestFailedError;
      }
    case 'UserCancelled':
      {
        return UserCancelledError;
      }
    case 'InvalidChallenge':
      {
        return InvalidChallengeError;
      }
    case 'BadConfiguration':
      {
        return BadConfiguration;
      }
    case 'Interrupted':
      {
        return InterruptedError;
      }
    case 'NoCredentials':
      {
        return NoCredentialsError;
      }
    case 'TimedOut':
      {
        return TimeoutError;
      }
    case 'UnknownError':
      {
        return UnknownError;
      }
    default:
      {
        return NativeError(String(_error));
      }
  }
}
//# sourceMappingURL=PasskeyError.js.map