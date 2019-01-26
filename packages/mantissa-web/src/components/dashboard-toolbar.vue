<template>
  <v-toolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    dark
    app
    fixed
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="toggleNavigation()"></v-toolbar-side-icon>
      <span>{{ $t('meta.brand.name') }}</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="search"
      :label="$t('component.dashboardToolbar.searchPlaceholder')"
      class="hidden-sm-and-down"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-menu v-if="isLoggedIn" bottom :offset-y="true">
      <div slot="activator">
        <v-btn flat class="hidden-sm-and-down">
          <span>{{ emailName }}</span>
          <v-icon light right>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn icon flat class="hidden-md-and-up">
          <v-icon light>mdi-account-circle</v-icon>
        </v-btn>
      </div>
      <v-list>
        <v-list-tile @click="$router.push({ name: 'signOut' })">
          <v-list-tile-title>{{ $t('component.dashboardToolbar.signOutButton') }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
  import { Getter } from 'vuex-class'

  @Component({})
  export default class DashboardToolbarComponent extends Vue {
    @Getter('isLoggedIn', { namespace: 'user' })
    private isLoggedIn!: boolean;

    @Getter('emailName', { namespace: 'user' })
    private emailName!: string;

    @Emit()
    public toggleNavigation(): void {/* */}
  }
</script>
