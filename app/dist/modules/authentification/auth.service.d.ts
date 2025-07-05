import { User } from "../../models/user.model";
import { SignupInput } from "../../DTO/signup.input";
export declare class AuthService {
    private userModel;
    constructor(userModel: typeof User);
    signup(signupInput: SignupInput): Promise<User>;
}
