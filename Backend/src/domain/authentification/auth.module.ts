import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "../../infrastructure/resolvers/auth.resolver";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../../models/user.model";

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
