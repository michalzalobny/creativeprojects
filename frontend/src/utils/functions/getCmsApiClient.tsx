import { sliceSlash } from 'utils/functions/sliceSlash';

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  DefaultOptions,
} from '@apollo/client';
import fetch from 'isomorphic-unfetch';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? sliceSlash(process.env.NEXT_PUBLIC_CMS_GRAPHQL_URL_PROD)
      : sliceSlash(process.env.NEXT_PUBLIC_CMS_GRAPHQL_URL_LOCAL),
  fetch,
});

export const cmsApiClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions,
});
