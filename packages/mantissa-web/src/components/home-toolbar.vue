<template>
  <v-toolbar dark>
    <v-toolbar-title>{{ $t('meta.brand.name') }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!isLoggedIn" flat class="hidden-sm-and-down" @click="$router.push({ name: 'register' })">
      <v-icon light left>mdi-account-plus</v-icon>
      <span>{{ $t('component.homeToolbar.registerButton') }}</span>
    </v-btn>
    <v-btn v-if="!isLoggedIn" flat class="hidden-sm-and-down" @click="$router.push({ name: 'signIn' })">
      <v-icon light left>mdi-login-variant</v-icon>
      <span>{{ $t('component.homeToolbar.signInButton') }}</span>
    </v-btn>
    <v-btn v-if="isLoggedIn" flat class="hidden-sm-and-down" @click="$router.push({ name: 'signOut' })">
      <v-icon light left>mdi-logout-variant</v-icon>
      <span>{{ $t('component.homeToolbar.signOutButton') }}</span>
    </v-btn>
    <v-menu bottom left class="hidden-md-and-up">
      <v-btn slot="activator" icon flat>
        <v-icon light>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-if="isLoggedIn" @click="$router.push({ name: 'signOut' })">
          <v-list-tile-title>{{ $t('component.homeToolbar.signOutButton') }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="!isLoggedIn" @click="$router.push({ name: 'signIn' })">
          <v-list-tile-title>{{ $t('component.homeToolbar.signInButton') }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="!isLoggedIn" @click="$router.push({ name: 'register' })">
          <v-list-tile-title>{{ $t('component.homeToolbar.registerButton') }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Getter } from 'vuex-class'

  @Component({})
  export default class HomeToolbarComponent extends Vue {
    @Getter('isLoggedIn', { namespace: 'user' })
    private isLoggedIn!: boolean;
  }
</script>
