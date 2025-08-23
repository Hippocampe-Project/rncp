import {
  ApolloClient,
  ApolloLink,
  fromPromise,
  InMemoryCache,
} from '@apollo/client';
import { HttpLink } from '@apollo/client';

// const httpLink = new HttpLink({ uri: 'http://localhost:3000' });

const httpLink = new HttpLink({
  uri: 'http://localhost:3000', // make sure this points to your GraphQL endpoint
  fetch: async (uri, options) => {
    const response = await fetch(uri, options);

    // Log raw response before parsing
    const text = await response.text();
    console.log('📦 Raw GraphQL response:', text);

    // Re-create a Response object so Apollo can parse it normally
    return new Response(text, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  },
});

const authLink = new ApolloLink((operation, forward) => {
  return fromPromise(
    fetch('/api/token')
      .then((res) => res.json())
      .then(({ accessToken }) => {
        console.log('✅ Step 4: Access token received:', accessToken); // log JWT
        return accessToken;
      }),
  ).flatMap((accessToken) => {
    operation.setContext({
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });

    const obs = forward(operation);
    obs.subscribe({
      next: (result) => console.log('➡️ Step 4: GraphQL response:', result), // log GraphQL response
      error: (err) => console.error('❌ Step 4: GraphQL error:', err),
    });

    return obs;
  });
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
