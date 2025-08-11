import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
    login(req, res) {
      return handleLogin(req, res, {
        returnTo: '/votes', // <-- this is your post-login redirect URI path on your app
        // You can also specify authorizationParams.redirect_uri here if needed
      });
    },
  });