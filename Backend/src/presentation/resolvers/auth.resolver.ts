import { Resolver, Query, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AuthService } from "../../domain/auth/auth.service";
import { User } from "../../infrastructure/models/user.model";
import { JwtAuthGuard } from "../../domain/auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@Context() ctx): Promise<User> {
    console.log("➡️ Received request with user:", ctx.req.user);
    return this.authService.findOrCreateUser(ctx.req.user);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  async allUsers(@Context() ctx): Promise<User[]> {
    return User.findAll();
  }
}
