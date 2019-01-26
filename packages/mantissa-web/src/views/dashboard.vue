<template>
  <v-app>
    <v-content v-if="isLoading">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-layout>
      </v-container>
    </v-content>

    <template v-if="!isLoading">
      <dashboard-navigator :items="navigatorItems" :enabled="isNavigatorVisible" />
      <dashboard-toolbar @toggle-navigation="isNavigatorVisible = !isNavigatorVisible" />
      <v-content>
        <router-view></router-view>
      </v-content>
    </template>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action, Getter } from 'vuex-class';
  import { TranslateResult } from 'vue-i18n';

  import DashboardToolbar from '../components/dashboard-toolbar.vue';
  import DashboardNavigator from '../components/dashboard-navigator.vue';
  import { IAccount, IUser, ICategory, IEntry } from '@mantissa/gql-types';

  export interface INavItem {
    icon?: string,
    text: TranslateResult,
    action: () => void
  }

  @Component({
    components: {
      DashboardToolbar,
      DashboardNavigator
    }
  })
  export default class DashboardView extends Vue {
    @Action('getInfo', { namespace: 'user' })
    private getUserInfo!: () => IUser;

    @Action('getAccounts', { namespace: 'account' })
    private getAccounts!: () => IAccount[];

    @Action('getCategories', { namespace: 'category' })
    private getCategories!: () => ICategory;

    @Action('getEntries', { namespace: 'entry' })
    private getEntries!: () => IEntry;

    private isNavigatorVisible: boolean = true;

    private isLoading: boolean = true;

    private async mounted():Promise<void> {
      await this.getUserInfo();

      await Promise.all([
        this.getAccounts(),
        this.getCategories(),
        this.getEntries()
      ]);

      this.isLoading = false;
    }

    private get navigatorItems(): INavItem[] {
      return [
        {
          action: () => this.$router.push({ name: 'operations' }),
          icon: 'mdi-swap-vertical',
          text: this.$t('view.dashboard.nav.operations')
        },
        {
          action: () => this.$router.push({ name: 'reports' }),
          icon: 'mdi-chart-pie',
          text: this.$t('view.dashboard.nav.reports')
        },
        {
          action: () => this.$router.push({ name: 'accounts' }),
          icon: 'mdi-bank',
          text: this.$t('view.dashboard.nav.accounts')
        },
        {
          action: () => this.$router.push({ name: 'categories' }),
          icon: 'mdi-shape',
          text: this.$t('view.dashboard.nav.categories')
        },
        {
          action: () => this.$router.push({ name: 'settings' }),
          icon: 'mdi-settings-outline',
          text: this.$t('view.dashboard.nav.settings')
        }
      ];
    }
  }
</script>
