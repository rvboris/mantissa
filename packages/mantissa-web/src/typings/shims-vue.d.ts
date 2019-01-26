declare module '*.vue' {
  import Vue, { PluginObject } from 'vue';
  export default Vue;
}

declare module 'vue-cli-plugin-apollo/graphql-client' {
  import ApolloClient from 'apollo-client';
  import { SubscriptionClient } from 'subscriptions-transport-ws';

  interface IMixedApolloClient<T> extends ApolloClient<T> {
    public wsClient?: SubscriptionClient;
  }

  export function createApolloClient(...args: any[]): {
    apolloClient: IMixedApolloClient<any>
    wsClient: SubscriptionClient
  }

  export function restartWebsockets(wsClient: SubscriptionClient): void;
}

declare module 'vuetify/lib' {
  import vuetify from 'vuetify';
  export default vuetify;
}
