<template>
  <v-card flat v-if="accounts">
    <form @submit.prevent="validateBeforeSubmit" novalidate>
      <v-container>
        <v-layout row wrap>
          <v-flex xs6>
            <v-autocomplete
              v-if="selectedAccountId"
              v-model="selectedAccountId"
              v-validate="'required'"
              item-text="name"
              item-value="id"
              required
              outline
              :items="accounts"
              :label="$t('component.entryExpenseForm.account')"
              :no-data-text="$t('component.entryExpenseForm.accountNotFound')"
              :error-messages="errors.collect('accounts')"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs6>
            <money-input
              v-model="amount"
              v-if="selectedAccount"
              v-validate="'required|min_value:1'"
              outline
              :label="$t('component.entryExpenseForm.amount')"
              :currency="selectedAccount.currency"
              :error-messages="errors.collect('amount')"
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-autocomplete
              v-if="selectedCategoryId"
              v-model="selectedCategoryId"
              v-validate="'required'"
              item-text="formattedName"
              item-value="id"
              required
              outline
              :items="categoriesList"
              :label="$t('component.entryExpenseForm.category')"
              :no-data-text="$t('component.entryExpenseForm.categoryNotFound')"
              :error-messages="errors.collect('category')"
            ></v-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 md4>
            <v-dialog
              v-model="modal"
              ref="dialog"
              persistent
              lazy
              full-width
              width="290px"
              :return-value.sync="factDate"
            >
              <v-text-field
                v-validate="'required'"
                readonly
                required
                outline
                slot="activator"
                :label="$t('component.entryExpenseForm.date')"
                :value="formattedFactDate"
                :error-messages="errors.collect('factDate')"
              ></v-text-field>
              <v-date-picker v-model="factDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">{{ $t('component.entryExpenseForm.cancel') }}</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(factDate)">{{ $t('component.entryExpenseForm.ok') }}</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-textarea
              v-model="description"
              outline
              :label="$t('component.entryExpenseForm.description')"
              :error-messages="errors.collect('description')"
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout row v-if="!!errorCode">
          <v-flex xs12>
            <v-alert
              :value="!!errorCode"
              type="error"
            >
              {{ $t(`errorCode.${errorCode}`) }}
            </v-alert>
          </v-flex>
        </v-layout>
        <v-layout row justify-end>
          <v-btn
            outline
            color="primary"
            type="submit"
            :disabled="inProcess">{{ $t('component.entryExpenseForm.addButton') }}</v-btn>
        </v-layout>
      </v-container>
    </form>
  </v-card>
</template>

<script lang="ts">
  import { format, parse } from 'date-fns';
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Action, State, Getter } from 'vuex-class';
  import { IAccount, ICategory, IEntry, ICreditInput } from '@mantissa/gql-types';
  import { CategoryProps } from '@mantissa/shared-types';
  import MoneyInput from './money-input.vue';

  @Component({
    components: {
      MoneyInput
    }
  })
  export default class EntryExpenseFormComponent extends Vue {
    @State('accounts', { namespace: 'account' })
    public accounts!: IAccount[];

    @Getter('getCategoriesList', { namespace: 'category' })
    public getCategoriesList!: (params?: any) => ICategory[];

    @Action('createCreditOperation', { namespace: 'entry' })
    public createCreditOperation!: (input: ICreditInput) => IEntry;

    public categoriesList!: ICategory[];
    public selectedAccountId: number|null = null;
    public selectedCategoryId: number|null = null;
    public amount: number = 0;
    public description: string = '';
    public factDate: string = new Date().toISOString().substr(0, 10);
    public modal: boolean = false;
    public errorCode: string = '';
    public inProcess: boolean = false;

    public async validateBeforeSubmit(): Promise<void> {
      this.errorCode = '';

      const isValid = await this.$validator.validateAll();

      if (!isValid) {
        return;
      }

      try {
        this.inProcess = true;

        if (this.selectedAccountId && this.selectedCategoryId) {
          await this.createCreditOperation({
            accountId: this.selectedAccountId,
            categoryId: this.selectedCategoryId,
            amount: this.amount,
            description: this.description,
            factDate: this.isoFactDate
          });
        }
      } catch (errCode) {
        this.errorCode = errCode;
      }

      this.inProcess = false;
    }

    public get selectedAccount() {
      return this.accounts.find(({id}) => id === this.selectedAccountId);
    }

    public get selectedCategory() {
      return this.categoriesList.find(({id}) => id === this.selectedCategoryId);
    }

    public get formattedFactDate () {
      return this.factDate ? format(parse(this.factDate, 'yyyy-MM-dd', new Date()), 'dd.MM.yyyy') : '';
    }

    public get isoFactDate () {
      return this.factDate ? parse(this.factDate, 'yyyy-MM-dd', new Date()).toISOString() : '';
    }

    private mounted(): void {
      if (this.accounts.length) {
        this.selectedAccountId = this.accounts[0].id;
      }

      this.categoriesList = this.getCategoriesList(CategoryProps.isCreditAllowed | CategoryProps.isBothAllowed);

      if (this.categoriesList.length) {
        this.selectedCategoryId = this.categoriesList[0].id;
      }
    }
  }
</script>
