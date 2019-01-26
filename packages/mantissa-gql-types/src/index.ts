export interface IGraphQLResponseRoot {
  data?: IQuery | IMutation;
  errors?: IGraphQLResponseError[];
}

export interface IGraphQLResponseError {
  /** Required for all errors */
  message: string;
  locations?: IGraphQLResponseErrorLocation[];
  /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
  [propName: string]: any;
}

export interface IGraphQLResponseErrorLocation {
  line: number;
  column: number;
}

export interface IQuery {
  accounts: IAccount | null[] | null;
  categories: ICategory | null;
  entries: IEntry[] | null;
  user: IUser | null;
  signIn: string | null;
}

export interface IEntriesOnQueryArguments {
  input?: IListInput | null;
}

export interface ISignInOnQueryArguments {
  input?: ISignInInput | null;
}

export interface IAccount {
  id: number;
  name: string;
  currency: ICurrency;
  type: number;
}

export interface ICurrency {
  id: number;
  symbol: string;
  decimalDigits: number;
  rounding: number;
  code: string;
}

export interface ICategory {
  id: number;
  name: string;
  props: number;
  children: ICategory[] | null;
}

export interface IListInput {
  offset: number;
  limit: number;
  type?: number | null;
  period: IPeriodInput;
  orderBy?: EntryOrderByInput | null;
}

export interface IPeriodInput {
  from: any;
  to: any;
}

export enum EntryOrderByInput {
  idAsc = 'idAsc',
  idDesc = 'idDesc',
  factDateAsc = 'factDateAsc',
  factDateDesc = 'factDateDesc',
  amountAsc = 'amountAsc',
  amountDesc = 'amountDesc',
}

export interface IEntry {
  id: number;
  amount: number;
  debit: IAccount;
  credit: IAccount;
  factDate: any;
  description: string | null;
}

export interface IUser {
  email: string;
  profile: IProfile;
}

export interface IProfile {
  id: number;
  baseCurrency: ICurrency;
  locale: string;
  timeZoneOffset: number;
}

export interface ISignInInput {
  email: string;
  password: string;
}

export interface IMutation {
  createDebitOperation: IEntry | null;
  updateDebitOperation: IEntry | null;
  createCreditOperation: IEntry | null;
  updateCreditOperation: IEntry | null;
  createTransferOperation: IEntry | null;
  updateTransferOperation: IEntry | null;
  deleteOperation: IEntry | null;
  register: string | null;
  signOut: boolean | null;
}

export interface ICreateDebitOperationOnMutationArguments {
  input?: IDebitInput | null;
}

export interface IUpdateDebitOperationOnMutationArguments {
  entryId: number;
  input?: IDebitInput | null;
}

export interface ICreateCreditOperationOnMutationArguments {
  input?: ICreditInput | null;
}

export interface IUpdateCreditOperationOnMutationArguments {
  entryId: number;
  input?: ICreditInput | null;
}

export interface ICreateTransferOperationOnMutationArguments {
  input?: ITransferInput | null;
}

export interface IUpdateTransferOperationOnMutationArguments {
  entryId: number;
  input?: ITransferInput | null;
}

export interface IDeleteOperationOnMutationArguments {
  entryId: number;
}

export interface IRegisterOnMutationArguments {
  input?: IRegisterInput | null;
}

export interface IDebitInput {
  accountId: number;
  categoryId: number;
  amount: number;
  factDate: any;
  description?: string | null;
}

export interface ICreditInput {
  accountId: number;
  categoryId: number;
  amount: number;
  factDate: any;
  description?: string | null;
}

export interface ITransferInput {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  factDate: any;
  description?: string | null;
}

export interface IRegisterInput {
  email: string;
  password: string;
  timezoneOffset?: number | null;
  locale?: string | null;
}
