import { IUser, IAccount, ICategory, IEntry } from '@mantissa/gql-types';

export interface IRootState {
  version: string;
}

export interface IUserState {
  accessToken: string;
  user?: IUser;
}

export interface IAccountState {
  accounts: IAccount[]
}

export interface ICategoryState {
  categories?: ICategory
}

export interface ICategoryListItem extends Omit<ICategory, 'children'> {
  formattedName?: string;
}

export interface IEntryState {
  entries: IEntry[]
}

export interface IEntryListItem extends IEntry {
  meta: {
    isExpense: boolean,
    isIncome: boolean,
    isTransfer: boolean
  }
}
