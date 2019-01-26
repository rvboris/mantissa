<template>
  <v-card>
    <v-tabs grow color="primary" slider-color="yellow" dark v-model="activeTab">
      <v-tab>{{ $t('component.entryForm.expense') }}</v-tab>
      <v-tab>{{ $t('component.entryForm.transfer') }}</v-tab>
      <v-tab>{{ $t('component.entryForm.income') }}</v-tab>
      <v-tab-item>
        <entry-expense-form />
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>2</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>3</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Action, Getter } from 'vuex-class';

  import EntryExpenseForm from './entry-expense-form.vue';

  @Component({
    components: {
      EntryExpenseForm
    }
  })
  export default class EntryFormComponent extends Vue {
    private activeTab: string = 'tab-0';
  }
</script>
