// import { getAccessToken } from '@auth0/nextjs-auth0';

// export async function GET(req) {
//   try {
//     const res = new Response();
//     const { accessToken } = await getAccessToken(req, res);
//     return Response.json({ accessToken });
//   } catch (err) {
//     console.error('Error fetching access token:', err);
//     return Response.json(
//       { error: 'Failed to fetch access token' },
//       { status: 500 },
//     );
//   }
// }
