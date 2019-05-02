<template>
  <v-card>
    <v-list two-line subheader>
      <template v-for="(entryList, date) in entryDictionary">
        <v-subheader inset :key="date">{{ date }}</v-subheader>

        <v-list-tile
          v-for="entry in entryList"
          :key="entry.id"
          avatar
        >
          <v-list-tile-avatar>
            <v-icon :class="[entry.meta.iconClass]">{{ entry.meta.icon }}</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ entry.meta.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ entry.meta.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
    <v-layout row>
      <v-flex xs12>
        <v-pagination
          v-model="currentPage"
          :length="6"
        ></v-pagination>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';
  import EntryListItem from './entry-list-item.vue';
  import { IEntryListItem, IDictionary } from '../store/types';

  @Component({
    components: {
      EntryListItem
    }
  })
  export default class EntryListComponent extends Vue {
    @Getter('getEntriesDictionary', { namespace: 'entry' })
    private getEntriesDictionary!: () => IDictionary<IEntryListItem[]>;

    private currentPage: number = 1;
    private entryDictionary: IDictionary<IEntryListItem[]> = {};

    private mounted(): void {
      this.entryDictionary = this.getEntriesDictionary();
    }
  }
</script>
