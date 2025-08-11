import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken";
import * as jwksRsa from "jwks-rsa";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly issuer = process.env.AUTH0_ISSUER_BASE_URL;
  private readonly audience = process.env.AUTH0_AUDIENCE;

  private jwksClient = jwksRsa({
    jwksUri: `${this.issuer}.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    if (!token) throw new UnauthorizedException("No token provided");

    const decodedHeader = jwt.decode(token, { complete: true });
    const kid = decodedHeader?.header.kid;
    if (!kid) throw new UnauthorizedException("Invalid token");

    const key = await this.jwksClient.getSigningKey(kid);
    const signingKey = key.getPublicKey();

    try {
      const decoded = jwt.verify(token, signingKey, {
        audience: this.audience,
        issuer: this.issuer,
        algorithms: ["RS256"],
      });
      req.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException("Token verification failed");
    }
  }
}
