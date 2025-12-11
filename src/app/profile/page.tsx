'use client';

import { gql, useQuery } from '@apollo/client';

const GET_ME = gql`
  query Me {
    me {
      id
      email
      name
    }
  }
`;

export default function UserProfilePage() {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data?.me) {
    // not logged in
    window.location.href = '/auth/login';
    return null;
  }

  return (
    <main>
      <h1>Welcome, {data.me.name}</h1>
      <p>Email: {data.me.email}</p>
    </main>
  );
}
