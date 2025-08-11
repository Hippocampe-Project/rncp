import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../../infrastructure/models/user.model";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async findOrCreateUser(decodedJwt: {
    sub: string;
    email: string;
    [key: string]: any;
  }): Promise<User> {
    const { sub: auth0Id, email } = decodedJwt;
    const existingUser = await this.userModel.findOne({ where: { auth0Id } });
    if (existingUser) return existingUser;

    const roles = decodedJwt["https://yourdomain.com/claims/roles"] || ["USER"];

    return this.userModel.create({
      email,
      auth0Id,
      emailVerified: true,
      role: roles.includes("ADMIN") ? "ADMIN" : "USER",
    });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new UnauthorizedException("User not found");
    return user;
  }
}
