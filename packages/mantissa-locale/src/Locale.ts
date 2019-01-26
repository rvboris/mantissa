import acceptLanguage from 'accept-language';

export class Locale {
  private localesMap = new Map([['ru', 'ru-RU'], ['en', 'en-US']]);
  private currencyCodeMap = new Map([['ru', 'RUB'], ['en', 'USD']]);

  private readonly defaultLocale: string;

  constructor({ defaultLocale = 'ru' }: { defaultLocale?: string } = {}) {
    this.defaultLocale = defaultLocale;
  }

  public getLocaleByBCP(code: string): string {
    for (const [key, value] of this.localesMap) {
      if (value === code) {
        return key;
      }
    }

    return this.defaultLocale;
  }

  public getBCPByLocale(locale: string): string {
    return (
      this.localesMap.get(locale) ||
      this.localesMap.get(this.defaultLocale) ||
      ''
    );
  }

  public getBCPLocales(): string[] {
    return Array.from(this.localesMap.values());
  }

  public getLocaleByHeader(header: string): string {
    acceptLanguage.languages(this.getBCPLocales());
    return this.getLocaleByBCP(acceptLanguage.get(header) || '');
  }

  public getCurrencyCodeForLocale(locale: string): string {
    return (
      this.currencyCodeMap.get(locale) ||
      this.currencyCodeMap.get(this.defaultLocale) ||
      ''
    );
  }
}
