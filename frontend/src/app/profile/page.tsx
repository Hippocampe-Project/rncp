'use client';

import * as React from 'react';
import '@/lib/env';

import { auth0 } from "../../lib/auth0";

export default async function UserProfilePage() {
   const session = await auth0.getSession();

  if (!session) {
    window.location.href = '/authentification'; 
  }

  return (
  <main>
        <div>This is the user profile page</div>
  </main>
);
}
