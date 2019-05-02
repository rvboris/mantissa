<template>
  <v-text-field v-bind="$attrs" v-model="data" ref="input" @input="onInput" />
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Action, Getter } from 'vuex-class';
  import AutoNumeric from 'autonumeric';
  import { ICurrency } from '@mantissa/gql-types';

  interface IRefElement extends Element {
    $refs: {
      input: Element
    }
  }

  @Component({})
  export default class MoneyInputComponent extends Vue {
    @Prop({ default: '' })
    public value!: string;

    @Prop({ required: true })
    public currency!: ICurrency;

    @Prop({ default: ' ' })
    public digitGroupSeparator!: string;

    @Prop({ default: false })
    public allowDecimalPadding!: boolean;

    public data: string = '';

    public autonumericInstance: any;

    public onInput(value: string): void {
      this.$emit('input', this.autonumericInstance.getNumber());
    }

    public get isDollar(): boolean {
      if (this.currency) {
        return this.currency.symbol === '$';
      }

      return true;
    }

    private mounted(): void {
      const inputRef = this.$refs.input as IRefElement;

      this.data = this.value;

      this.autonumericInstance = new AutoNumeric(inputRef.$refs.input, {
        // allowDecimalPadding: this.allowDecimalPadding,
        digitGroupSeparator: this.digitGroupSeparator,
        decimalPlaces: this.currency.decimalDigits,
        currencySymbol: this.isDollar ? this.currency.symbol : ` ${this.currency.symbol}`,
        currencySymbolPlacement: this.isDollar ? 'p' : 's'
      });
    }
  }
</script>
