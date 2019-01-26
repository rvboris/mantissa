import argon2 from 'argon2';
import { createHash, randomBytes } from 'crypto';

export class Auth {
  public static async validate(hash: string, value: string): Promise<boolean> {
    return argon2.verify(hash, value);
  }

  public static async hash(value: string): Promise<string> {
    return argon2.hash(value, {
      type: argon2.argon2i,
    });
  }

  public static async generateSessionKey(
    additionalData?: string
  ): Promise<string> {
    const salt = await randomBytes(128).toString('hex');
    const dataToHash = [Date.now(), salt, additionalData].join();
    const dataHash = createHash('sha256')
      .update(dataToHash)
      .digest('hex');

    return this.hash(dataHash);
  }
}
