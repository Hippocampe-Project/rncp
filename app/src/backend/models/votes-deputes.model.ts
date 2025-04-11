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
import { BelongsTo, InferAttributes, InferCreationAttributes } from "sequelize";

@ObjectType()
@Table({
  tableName: "votes_deputes",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["vote_id", "depute_id"],
    },
  ],
})
export class Votes_deputes extends Model<
  InferAttributes<Votes_deputes>,
  InferCreationAttributes<Votes_deputes>
> {
  @ForeignKey(() => Votes)
  @Column(DataType.INTEGER)
  @Field(() => Int)
  vote_id!: number;

  @ForeignKey(() => Deputes)
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
