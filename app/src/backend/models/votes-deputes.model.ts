import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Votes } from "./votes.model";
import { Deputes } from "./deputes.model";
import { InferAttributes, InferCreationAttributes } from "sequelize";

@ObjectType()
@Table({
  tableName: "votes_deputes",
  timestamps: false,
})
export class Votes_deputes extends Model<
  InferAttributes<Votes_deputes>,
  InferCreationAttributes<Votes_deputes>
> {
  @PrimaryKey
  @ForeignKey(() => Votes)
  @Column(DataType.INTEGER)
  @Field(() => Number)
  vote_id!: number;

  @PrimaryKey
  @ForeignKey(() => Deputes)
  @Column(DataType.INTEGER)
  @Field(() => Number)
  depute_id!: number;

  @Column(DataType.STRING)
  @Field(() => String)
  vote_category!: string;

  @Column(DataType.STRING)
  @Field(() => String)
  depute_nom!: string;

  @Column(DataType.STRING)
  @Field(() => String)
  vote_titre!: string;
}
