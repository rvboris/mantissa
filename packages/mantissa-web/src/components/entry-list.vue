<template>
  <v-card>
    <v-container fluid grid-list-md>
      <entry-list-item v-for="entry in entryList" :key="entry.id" />
      <v-layout row>
        <v-flex xs12>
          <v-pagination
            v-model="currentPage"
            :length="6"
          ></v-pagination>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';
  import EntryListItem from './entry-list-item.vue';
  import { IEntryListItem } from '../store/types';

  @Component({
    components: {
      EntryListItem
    }
  })
  export default class EntryListComponent extends Vue {
    @Getter('getEntriesList', { namespace: 'entry' })
    private getEntriesList!: () => IEntryListItem[];

    private currentPage: number = 1;
    private entryList: IEntryListItem[] = [];

    private mounted(): void {
      this.entryList = this.getEntriesList();
    }
  }
</script>
