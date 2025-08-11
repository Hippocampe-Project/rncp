import { handleAuth, handleLogin } from "@auth0/nextjs-auth0"

// automatically crate the 5 route
export const GET = handleAuth();