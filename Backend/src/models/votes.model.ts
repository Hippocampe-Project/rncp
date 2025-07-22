import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Votes_deputes } from "./votes-deputes.model";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Table({
  tableName: "votes",
  timestamps: false,
})
export class Votes extends Model<
  InferAttributes<Votes>,
  InferCreationAttributes<Votes>
> {
  @PrimaryKey
  @AutoIncrement
  @ForeignKey(() => Votes_deputes)
  @Column(DataType.INTEGER)
  @Field(() => Int)
  id!: number;

  @Column(DataType.STRING)
  @Field()
  titre!: string;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  dossier_legislatif?: string;

  @Column(DataType.STRING)
  @Field()
  numero_vote!: string;

  @Column(DataType.STRING)
  @Field()
  date!: string;

  @Column(DataType.INTEGER)
  @Field(() => Int)
  num_votants!: number;

  @Column(DataType.INTEGER)
  @Field(() => Int)
  num_pour!: number;

  @Column(DataType.INTEGER)
  @Field(() => Int)
  num_contre!: number;

  @Column(DataType.INTEGER)
  @Field(() => Int)
  num_abstention!: number;

  @Column(DataType.ARRAY(DataType.STRING))
  @Field(() => [String])
  non_votants!: string[];

  @Column(DataType.INTEGER)
  num_non_votants!: number;

  @Column(DataType.BOOLEAN)
  @Field({ nullable: true })
  adopte?: boolean;

  @Column(DataType.INTEGER)
  @Field()
  num_absents!: number;

  @Column(DataType.ARRAY(DataType.STRING))
  @Field(() => [String])
  votants_pour!: string[];

  @Column(DataType.ARRAY(DataType.STRING))
  @Field(() => [String])
  votants_contre!: string[];

  @Column(DataType.ARRAY(DataType.STRING))
  @Field(() => [String])
  votants_abstention!: string[];
}
