import { Environment } from '@mantissa/env';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppLogger } from './app-logger.provider';

export class Env {
  public static getInstance(): Env {
    return this.instance || (this.instance = new this());
  }

  private static instance: Env;
  private readonly env: NodeJS.ProcessEnv;
  private readonly defaults = {
    jwtPrivateKey: join(process.cwd(), './default-keys/jwt.private.key'),
    jwtPublicKey: join(process.cwd(), './default-keys/jwt.public.key')
  }

  constructor() {
    const bootstrapLogger = AppLogger.getInstance();

    Environment.load({
      log: bootstrapLogger.log.bind(bootstrapLogger)
    });

    this.env = process.env;
  }

  public isProduction(): boolean {
    return this.env.NODE_ENV === 'production';
  }

  public isDevelopment(): boolean {
    return this.env.NODE_ENV === 'development';
  }

  public getDatabasePort(): number {
    return Number(this.env.DB_PORT);
  }

  public getDatabaseHost(): string {
    return this.env.DB_HOST || '';
  }

  public getDatabaseUser(): string {
    return this.env.DB_USER || '';
  }

  public getDatabasePassword(): string {
    return this.env.DB_PASS || '';
  }

  public getDatabaseName(): string {
    return this.env.DB_NAME || '';
  }

  public getDatabaseSchema(): string {
    return this.env.DB_SCHEMA || '';
  }

  public getJWTPrivateKey(): Buffer {
    return readFileSync(this.env.JWT_KEY_PRIVATE_PATH || this.defaults.jwtPrivateKey);
  }

  public getJWTPublicKey(): Buffer {
    return readFileSync(this.env.JWT_KEY_PUBLIC_PATH || this.defaults.jwtPublicKey);
  }

  public getJWTExpires(): string {
    return this.env.JWT_EXPIRES || '';
  }

  public getLocales(): string[] {
    return (this.env.LOCALES || '').split(',');
  }

  public getFallbackLocale(): string {
    return this.env.FALLBACK_LOCALE || '';
  }
}
