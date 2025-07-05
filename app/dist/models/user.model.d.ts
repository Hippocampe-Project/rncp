import { Model } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
export declare class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: number;
    password: string;
    email: string;
    emailVerified: boolean;
    role: "USER" | "ADMIN";
    refreshToken?: string;
}
