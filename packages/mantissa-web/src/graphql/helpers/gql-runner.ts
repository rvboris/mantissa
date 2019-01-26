import get from 'lodash/get';
import { ErrorCode } from '@mantissa/error-codes';

export const gqlRunner = async <T>(command: () => T): Promise<T> => {
  try {
    return command();
  } catch (err) {
    const errorCode = get(err, 'graphQLErrors.0.code', ErrorCode[ErrorCode.UNKNOWN]);
    return Promise.reject(errorCode);
  }
}
