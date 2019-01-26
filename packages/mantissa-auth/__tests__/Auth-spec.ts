import { Auth } from '../src/Auth';

describe('auth', () => {
  test('should hash password', async () => {
    const hash = await Auth.hash('123456');
    expect(hash).not.toBeUndefined();
  });

  test('should check password', async () => {
    const hash = await Auth.hash('123456');

    let isValid = await Auth.validate(hash, '123456');
    expect(isValid).toBe(true);

    isValid = await Auth.validate(hash, '1234567');
    expect(isValid).toBe(false);
  });

  test('shoud generate session key', async () => {
    const sessionKey1 = await Auth.generateSessionKey('123');

    expect(sessionKey1).not.toBeUndefined();

    const sessionKey2 = await Auth.generateSessionKey('123');

    expect(sessionKey2).not.toBe(sessionKey1);
  });
});
