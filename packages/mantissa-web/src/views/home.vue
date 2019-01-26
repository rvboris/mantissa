<template>
  <v-app>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <home-toolbar />
        <v-content>
          <v-container fluid>
            <v-btn small v-on:click="changeLocale('en')">Set En</v-btn>
            <v-btn small v-on:click="changeLocale('ru')">Set Ru</v-btn>
          </v-container>
        </v-content>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
  import { loadLanguageAsync } from '../plugins/i18n';
  import { Component, Vue } from 'vue-property-decorator';

  import HomeToolbar from '../components/home-toolbar.vue';

  @Component({
    components: {
      HomeToolbar
    }
  })
  export default class HomeView extends Vue {
    private changeLocale(locale: string) {
      loadLanguageAsync(locale);
    }
  }
</script>
