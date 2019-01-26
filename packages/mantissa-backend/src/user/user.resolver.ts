import { UseGuards, Inject } from '@nestjs/common';
import { Locale } from '@mantissa/locale';
import { ErrorCode } from '@mantissa/error-codes';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { CategoryService } from '../category/category.service';
import { Env } from '../common/providers/env.provider';
import { ProfileService } from '../profile/profile.service';
import { CurrencyService } from '../currency/currency.service';
import { AccountService } from '../account/account.service';
import { ValidatedRegisterInput } from './validated/register-input';
import { transformAndValidate } from 'class-transformer-validator';
import { UserInputError, AuthenticationError } from 'apollo-server';
import { AppLogger } from '../common/providers/app-logger.provider';
import { ValidatedSignInInput } from './validated/sign-in-input';
import { SessionService } from '../auth/session.service';
import { SessionEntity } from '../auth/session.entity';
import { IUser, IRegisterInput, ISignInInput } from '@mantissa/gql-types';
import { GraphQLError } from 'graphql';

@Resolver('User')
export class UserResolver {
  private readonly locale: Locale;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
    private readonly categoriesService: CategoryService,
    private readonly profileService: ProfileService,
    private readonly currencyService: CurrencyService,
    private readonly accountService: AccountService,
    @Inject('Logger') private readonly logger: AppLogger,
    @Inject('Env') private readonly env: Env
  ) {
    this.locale = new Locale({ defaultLocale: this.env.getFallbackLocale() });
  }

  @Query()
  @UseGuards(new GqlAuthGuard())
  public async user(@Context('req') { user: session }: { user: SessionEntity }): Promise<IUser> {
    return (await session.user).toGqlObject();
  }

  @Mutation()
  public async register(@Context('req') { headers }, @Args('input') input: IRegisterInput): Promise<string> {
    try {
      await transformAndValidate(ValidatedRegisterInput, input, { validator: { skipMissingProperties: true } });
    } catch (e) {
      this.logger.warn(e.message);
      throw new UserInputError(ErrorCode[ErrorCode.VALIDATION_FAILED]);
    }

    const isUserExist = await this.userService.countByEmail(input.email) > 0;

    if (isUserExist) {
      this.logger.warn('user alredy exists');
      throw new UserInputError(ErrorCode[ErrorCode.USER_ALREADY_EXISTS]);
    }

    const userLocale = input.locale
      ? input.locale
      : this.locale.getLocaleByHeader(headers['accept-language'] || '');

    if (!this.env.getLocales().includes(userLocale)) {
      this.logger.warn(`locale ${userLocale} is not supported`);
      throw new UserInputError(ErrorCode[ErrorCode.UNSUPPORTED_LOCALE]);
    }

    const userOffset = input.timezoneOffset ? input.timezoneOffset : 0;

    const currencyForLocale = this.locale.getCurrencyCodeForLocale(userLocale);
    const userBaseCurrency = await this.currencyService.findCurrencyByCode(currencyForLocale);

    if (!userBaseCurrency) {
      this.logger.warn(`currency ${currencyForLocale} is not supported`);
      throw new UserInputError(ErrorCode[ErrorCode.UNSUPPORTED_CURRENCY]);
    }

    const profile = await this.profileService.createProfile({
      baseCurrency: userBaseCurrency,
      locale: userLocale,
      timezoneOffset: userOffset
    });

    const user = await this.userService.register({
      email: input.email,
      password: input.password
    }, profile);

    await this.categoriesService.createCategories(user, userLocale);
    await this.accountService.createAccounts(user, userLocale);

    const session = await this.sessionService.create(user);

    return this.authService.createToken({ key: session.key });
  }

  @Query()
  public async signIn(@Args('input') input: ISignInInput): Promise<string> {
    try {
      await transformAndValidate(ValidatedSignInInput, input);
    } catch (e) {
      this.logger.warn(e.message);
      throw new UserInputError(ErrorCode[ErrorCode.VALIDATION_FAILED]);
    }

    const user = await this.userService.findByEmail(input.email);

    if (!user) {
      throw new AuthenticationError(ErrorCode[ErrorCode.SIGN_IN_FAIL]);
    }

    const isValidPassword = await this.authService.validateUser(user.password, input.password);

    if (!isValidPassword) {
      throw new AuthenticationError(ErrorCode[ErrorCode.SIGN_IN_FAIL]);
    }

    const session = await this.sessionService.create(user);

    return this.authService.createToken({ key: session.key });
  }

  @Mutation()
  @UseGuards(new GqlAuthGuard())
  public async signOut(@Context('req') { user: session }: { user: SessionEntity }): Promise<boolean> {
    try {
      await session.remove();
    } catch (e) {
      this.logger.warn(e.message);
      throw new GraphQLError(ErrorCode[ErrorCode.UNKNOWN]);
    }

    return true;
  }
}
