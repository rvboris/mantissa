<template>
  <v-container fluid grid-list-lg>
    <v-layout v-bind="layoutMode">
      <v-flex xs8 order-lg1 order-xs2>
        <v-layout column>
          <v-flex>
            <entry-form />
          </v-flex>
          <v-flex>
            <v-card>Operations</v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs4 order-lg2 order-xs1>
        <balance-list />
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import BalanceList from '../../components/balance-list.vue';
  import EntryForm from '../../components/entry-form.vue';

  @Component({
    components: {
      BalanceList,
      EntryForm
    }
  })
  export default class DashboardOperationsView extends Vue {
    private get layoutMode () {
      const binding = {
        column: false
      };

      if (this.$vuetify.breakpoint.smAndDown) {
        binding.column = true;
      }

      return binding;
    }
  }
</script>
