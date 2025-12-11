import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql', // this will be intercepted by MSW
  cache: new InMemoryCache(),
});

describe('Integration: ApolloClient (mocked)', () => {
  it('fetches logged-in user', async () => {
    const { data } = await client.query({
      query: gql`
        query Me {
          me {
            id
            email
          }
        }
      `,
    });

    expect(data.me).toBeDefined();
    expect(data.me.email).toBe('test@example.com');
  });
});
