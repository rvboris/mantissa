import { GetterTree } from 'vuex';
import { IRootState, IEntryState, IEntryListItem, IDictionary } from '../types';
import { AccountType } from '@mantissa/shared-types';
import { groupBy } from 'lodash-es';
import { formatRelative, format, parse } from 'date-fns';

export const getters: GetterTree<IEntryState, IRootState> = {
  getEntriesDictionary(state): () => IDictionary<IEntryListItem[]> {
    return (): IDictionary<IEntryListItem[]> => {
      const items = state.entries.map((entry) => {
        const isExpense = entry.debit.type === AccountType.SystemDebit;
        const isIncome = entry.credit.type === AccountType.SystemCredit;
        const isTransfer = !isExpense && !isIncome;

        const getIcon = (): string => {
          if (isExpense) {
            return 'mdi-arrow-up-bold-outline';
          }

          if (isIncome) {
            return 'mdi-plus-outline';
          }

          if (isTransfer) {
            return 'mdi-bank-transfer';
          }

          return '';
        };

        const getIconClass = (): string => {
          return 'light';
        };

        const getTitle = (): string => {
          return '123';
        };

        const getSubtitle = (): string => {
          return formatRelative(parse(entry.factDate, 'yyyy-MM-dd', new Date()), new Date());
        };

        return {
          ...entry,
          meta: {
            isExpense,
            isIncome,
            isTransfer,
            icon: getIcon(),
            iconClass: getIconClass(),
            title: getTitle(),
            subtitle: getSubtitle()
          }
        };
      });

      return groupBy(items, (item: IEntryListItem) => {
        return format(parse(item.factDate, 'yyyy-MM-dd', new Date()), 'MM.DD.YYYY');
      });
    };
  }
};
