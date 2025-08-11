'use client';

import * as React from 'react';
import '@/lib/env';
//import Login from '@/components/Login';

export default function AuthentificationPage() {
  return (
    <main>
      <a href="/auth/login">Login</a>
    </main>
  )
}

// export default async function AuthPage() {
//   // Fetch the user session
//   const session = await auth0.getSession();
  
//   // If no session, show sign-up and login buttons
//   if (!session) {
//     return (
//       <main>
//         <a href="/api/auth?screen_hint=signup">
//           <button>Sign up</button>
//         </a>
//         <a href="/api/auth">
//           <button>Log in</button>
//         </a>
//       </main>
//     );
//   }

//   // If session exists, show a welcome message and logout button
//   return (
//     <main>
//       <h1>Welcome, {session.user.name}!</h1>
//       <p>
//         <a href="/api/auth/logout">
//           <button>Log out</button>
//         </a>
//       </p>
//     </main>
//   );
// }