import { config } from 'dotenv-safe';
import { existsSync } from 'fs';
import { resolve } from 'path';

export interface IEnvironmentOptions {
  log?: (...args: any[]) => void;
  loadOnce?: boolean;
}

export class Environment {
  public static load({ log, loadOnce }: IEnvironmentOptions = {}): void {
    if (!this.instance || !loadOnce) {
      this.instance = new this(log);
    }
  }

  private static instance: Environment;
  private static readonly defaultEnvPath: string = resolve(
    __dirname,
    '../defaults/default.env'
  );
  private static readonly sampleEnvPath: string = resolve(
    __dirname,
    '../samples/default.env.sample'
  );

  constructor(log?: (msg: string) => void) {
    const envPath: string = process.env.ENV_FILE_PATH
      ? resolve(process.env.ENV_FILE_PATH)
      : '';
    const useEnvFile: boolean = existsSync(envPath);

    config({
      allowEmptyValues: true,
      path: useEnvFile ? envPath : Environment.defaultEnvPath,
      sample: Environment.sampleEnvPath,
    });

    if (log) {
      log(useEnvFile ? `use ${envPath} env file` : 'use default env file');
    }
  }
}
