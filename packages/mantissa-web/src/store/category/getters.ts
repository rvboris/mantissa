import { GetterTree } from 'vuex';
import { IRootState, ICategoryState, ICategoryListItem } from '../types';
import { ICategory } from '@mantissa/gql-types';
import TreeModel from 'tree-model';

export const getters: GetterTree<ICategoryState, IRootState> = {
  getCategoriesList(state): (state: number) => ICategoryListItem[] {
    return (categoryProps: number): ICategoryListItem[] => {
      if (!state.categories) {
        return [];
      }

      const tree = new TreeModel();
      const root = tree.parse<ICategoryListItem>(state.categories as ICategoryListItem);

      const nodes = root.all((node) => {
        const model: ICategory = node.model;
        return !!(model.props & categoryProps);
      });

      return nodes.reduce((arr: ICategoryListItem[], node) => {
        const path = node.getPath();

        if (!node.isRoot()) {
          path.shift();
        }

        arr.push({
          ...node.model,
          formattedName: path.map(n => n.model.name).join(' > ')
        });

        return arr;
      }, []);
    }
  }
};
