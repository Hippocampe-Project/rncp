import { Field, Int, ObjectType } from "@nestjs/graphql";
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
  @ForeignKey(() => Votes)
  @PrimaryKey
  @Column(DataType.INTEGER)
  @Field(() => Int)
  vote_id!: number;

  @ForeignKey(() => Deputes)
  @PrimaryKey
  @Column(DataType.INTEGER)
  @Field(() => Int)
  depute_id!: number;

  @Column(DataType.STRING)
  @Field()
  vote_category!: string;

  @Column(DataType.STRING)
  @Field()
  depute_nom!: string;

  @Column(DataType.STRING)
  @Field()
  vote_titre!: string;
}
