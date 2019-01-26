import { resolve } from 'path';
import { Environment } from '../src/Environment';

describe('environmental variables', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('should load default env file', () => {
    Environment.load({ loadOnce: false });
    expect(process.env.DB_PASS).toBe('123456');
  });

  test('should load env file from path', () => {
    process.env.ENV_FILE_PATH = resolve(
      __dirname + '/../defaults/docker-prod.env'
    );
    Environment.load({ loadOnce: false });
    expect(process.env.DB_PASS).toBe('123456');
  });

  test('should load env file from path and log', () => {
    process.env.ENV_FILE_PATH = resolve(
      __dirname + '/../defaults/docker-prod.env'
    );
    const mockLog = jest.fn(msg => msg);

    Environment.load({ loadOnce: false, log: mockLog });

    expect(process.env.DB_PASS).toBe('123456');
    expect(mockLog.mock.calls.length).toBe(1);
  });
});
