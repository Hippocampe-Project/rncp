// "use client";

// import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

// );

// const authLink = new ApolloLink((operation, forward) => {
//   return fetch("/api/token") // call our Next.js route
//     .then(res => res.json())
//     .then(({ accessToken }) => {
//       operation.setContext({
//         headers: {
//           Authorization: accessToken ? `Bearer ${accessToken}` : "",
//         },
//       });
//       return forward(operation);
//     });
// });

// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });
