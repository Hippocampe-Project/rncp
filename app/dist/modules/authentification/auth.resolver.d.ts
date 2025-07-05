import { AuthService } from "./auth.service";
import { SignupInput } from "../../DTO/signup.input";
import { User } from "../../models/user.model";
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    signup(data: SignupInput): Promise<User>;
}
