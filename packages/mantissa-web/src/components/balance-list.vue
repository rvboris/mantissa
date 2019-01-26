<template>
  <v-card>
    <v-card-title><h4>{{ $t('component.balanceList.title') }}</h4></v-card-title>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-tile>
        <v-list-tile-content>Calories:</v-list-tile-content>
        <v-list-tile-content class="align-end">123</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Action, Getter } from 'vuex-class';

  @Component({})
  export default class BalanceListComponent extends Vue {
  }
</script>
