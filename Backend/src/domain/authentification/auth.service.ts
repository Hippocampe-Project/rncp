// src/auth/auth.service.ts
import { Injectable, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../../models/user.model";
import * as bcrypt from "bcrypt";
import { SignupInput } from "../DTO/signup.input";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async signup(signupInput: SignupInput): Promise<User> {
    const { email, password } = signupInput;

    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      emailVerified: false,
      role: "USER",
    });

    return user;
  }
}
