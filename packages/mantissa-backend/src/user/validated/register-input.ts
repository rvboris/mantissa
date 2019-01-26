import { IRegisterInput } from '@mantissa/gql-types';
import { IsEmail, Length, IsInt, Min, Max } from 'class-validator';

export class ValidatedRegisterInput implements IRegisterInput {
  @IsEmail()
  public email: string;

  @Length(8)
  public password: string;

  @IsInt()
  @Min(0)
  @Max(1440)
  public timezoneOffset?: number;

  public locale?: string;
}
