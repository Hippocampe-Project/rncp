import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "../../domain/authentification/auth.service";
import { SignupInput } from "../../domain/DTO/signup.input";
import { User } from "../../models/user.model";

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async signup(@Args("data") data: SignupInput): Promise<User> {
    return this.authService.signup(data);
  }
}
