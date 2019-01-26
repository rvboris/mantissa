import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { onError } from 'apollo-link-error';
import { ErrorCode } from '@mantissa/error-codes';
import {
  createApolloClient,
  restartWebsockets,
  IMixedApolloClient
} from 'vue-cli-plugin-apollo/graphql-client';
import jwtDecode from 'jwt-decode';
import { router } from '../router';
import store from '../store';

Vue.use(VueApollo);

const TOKEN_NAME = 'accessToken';
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:3000/graphql';

interface IJwtToken {
  id: number,
  exp: number,
  iat: number
}

const isTokenExpired = (token: string): boolean => {
  const now = Date.now().valueOf() / 1000

  try {
    const decoded = jwtDecode<IJwtToken>(token);
    return decoded.exp < now;
  } catch (e) {
    return true;
  }
};

export const getAuthToken = (): string => {
  if (window && window.localStorage) {
    const token = window.localStorage.getItem(TOKEN_NAME);

    if (!token) {
      return '';
    }

    if (isTokenExpired(token)) {
      return '';
    }

    return `Bearer ${token}`;
  }

  return '';
};

const link = onError(({ graphQLErrors }) => {
  if (!graphQLErrors) {
    return;
  }

  graphQLErrors.map(({ message }) => {
    if (message === ErrorCode[ErrorCode.UNAUTHORIZED]) {
      store.dispatch('user/signOut').then(() => {
        router.replace({ name: 'signIn' });
      });
    }
  });
});

const defaultOptions = {
  httpEndpoint,
  wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:3000/subscriptions',
  tokenName: TOKEN_NAME,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
  getAuth: getAuthToken,
  link
};

export function getApolloClient(options = {}): IMixedApolloClient<any> {
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  });

  apolloClient.wsClient = wsClient;

  return apolloClient;
}

export function createProvider (options = {}) {
  const apolloClient = getApolloClient(options);
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        fetchPolicy: 'cache-and-network'
      },
    },
    errorHandler (error) {
      // tslint:disable-next-line: no-console
      console.error(error.message);
    },
  })

  return apolloProvider
};

export async function onSignIn (apolloClient: IMixedApolloClient<any>, token: string) {
  if (window && window.localStorage) {
    localStorage.setItem(TOKEN_NAME, token)
  }

  if (apolloClient.wsClient) {
    restartWebsockets(apolloClient.wsClient);
  }

  try {
    await apolloClient.resetStore();
  } catch (e) {
    // tslint:disable-next-line: no-console
    console.error('Error on cache reset (login)', e.message);
  }
}

export async function onSignOut (apolloClient: IMixedApolloClient<any>) {
  if (window && window.localStorage) {
    localStorage.removeItem(TOKEN_NAME);
  }

  if (apolloClient.wsClient) {
    restartWebsockets(apolloClient.wsClient);
  }

  try {
    await apolloClient.resetStore();
  } catch (e) {
    // tslint:disable-next-line: no-console
    console.error('Error on cache reset (logout)', e.message);
  }
}
