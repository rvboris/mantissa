import { GetterTree } from 'vuex';
import { IRootState, IEntryState, IEntryListItem } from '../types';
import { AccountType } from '@mantissa/shared-types';

export const getters: GetterTree<IEntryState, IRootState> = {
  getEntriesList(state): () => IEntryListItem[] {
    return (): IEntryListItem[] => {
      return state.entries.map((entry) => {
        const isExpense = entry.debit.type === AccountType.SystemDebit;
        const isIncome = entry.credit.type === AccountType.SystemCredit;
        const isTransfer = !isExpense && !isIncome;

        return {
          ...entry,
          meta: {
            isExpense,
            isIncome,
            isTransfer
          }
        };
      });
    };
  }
};
