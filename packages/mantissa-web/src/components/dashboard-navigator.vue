<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="isEnabled"
    fixed
    app
  >
    <v-list dense>
      <template v-for="item in items">
        <v-layout
          v-if="item.heading"
          :key="item.heading"
          row
          align-center
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          v-model="item.model"
          :key="item.text"
          :prepend-icon="item.model ? item.icon : item.iconAlt"
          append-icon=""
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            @click="item.action()"
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ child.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :key="item.text" @click="item.action()">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { INavItem } from '../views/dashboard.vue';

  @Component({})
  export default class DashboardNavigatorComponent extends Vue {
    @Prop()
    public items!: INavItem[];

    @Prop()
    public enabled!: boolean;

    private get isEnabled() {
      return this.enabled;
    }

    private set isEnabled(val) { /* */ }
  }
</script>
