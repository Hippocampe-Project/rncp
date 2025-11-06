/* eslint-disable no-console */
import {
  ApolloClient,
  ApolloLink,
  fromPromise,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

const httpLink = new HttpLink({
  uri: `${BACKEND_URL}/graphql`,
  fetch: async (uri, options) => {
    const response = await fetch(uri, options);
    const text = await response.text();
    console.log('📦 Raw GraphQL response:', text);
    return new Response(text, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  },
});

const authLink = new ApolloLink((operation, forward) =>
  fromPromise(
    fetch('/auth/access-token', { credentials: 'include' })
      .then((res) => res.json())
      .then(({ accessToken }) => {
        console.log('✅ Access token received:', accessToken);
        return accessToken;
      }),
  ).flatMap((accessToken) => {
    operation.setContext(
      ({ headers = {} }: { headers?: Record<string, string> }) => {
        const newHeaders: Record<string, string> = { ...headers };
        if (accessToken) {
          newHeaders.Authorization = `Bearer ${accessToken}`;
        }
        return { headers: newHeaders };
      },
    );

    return forward(operation);
  }),
);

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
