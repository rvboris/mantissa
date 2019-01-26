import { IsEmail, Length } from 'class-validator';
import { ISignInInput } from '@mantissa/gql-types';

export class ValidatedSignInInput implements ISignInInput {
  @IsEmail()
  public email: string;

  @Length(8)
  public password: string;
}
