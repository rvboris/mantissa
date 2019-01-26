import { Locale } from '../src/Locale';

describe('locale', () => {
  test('should get locale by BCP tag', () => {
    const locale = new Locale();
    expect(locale.getLocaleByBCP('en-US')).toBe('en');
  });

  test('should get locale by BCP tag with default locale', () => {
    const locale = new Locale();
    expect(locale.getLocaleByBCP('somebsp')).toBe('ru');
  });

  test('should get BCP by locale', () => {
    const locale = new Locale();
    expect(locale.getBCPByLocale('en')).toBe('en-US');
  });

  test('should get BCP by locale with default locale', () => {
    const locale = new Locale();
    expect(locale.getBCPByLocale('somelocale')).toBe('ru-RU');
  });
});
