import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Table({
  tableName: "users",
  timestamps: false,
})
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Field(() => Int)
  id!: number;

  @Column(DataType.STRING)
  @Field()
  password!: string;

  @Column(DataType.STRING)
  @Field()
  auth0Id!: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  @Field()
  email!: string;

  @Column(DataType.BOOLEAN)
  @Field()
  emailVerified: boolean = false;

  @Column({ defaultValue: "USER" })
  @Field()
  role!: "USER" | "ADMIN";

  @Column(DataType.STRING)
  @Field({ nullable: true })
  refreshToken?: string;
}
