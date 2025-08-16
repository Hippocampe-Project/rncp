// src/app/api/token/route.ts
import { getAccessToken } from '@auth0/nextjs-auth0';

export async function GET() {
  const { accessToken } = await getAccessToken();
  return Response.json({ accessToken });
}
