import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "../../presentation/resolvers/auth.resolver";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../../infrastructure/models/user.model";

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
