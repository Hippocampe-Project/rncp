import { graphql } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer(
  graphql.query('Me', (req, res, ctx) => {
    return res(
      ctx.data({
        me: {
          id: '1',
          email: 'test@example.com',
        },
      }),
    );
  }),
);
