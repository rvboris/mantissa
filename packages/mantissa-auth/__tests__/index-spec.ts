import { Auth } from '../src/';

describe('index', () => {
  test('should has Auth class', async () => {
    expect(Auth).not.toBeUndefined();
  });
});
