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
  id!: number;

  @Column(DataType.STRING)
  titre!: string;

  @Column(DataType.STRING)
  dossier_legislatif?: string;

  @Column(DataType.STRING)
  numero_vote!: string;

  @Column(DataType.STRING)
  date!: string;

  @Column(DataType.INTEGER)
  num_votants!: number;

  @Column(DataType.INTEGER)
  num_pour!: number;

  @Column(DataType.INTEGER)
  num_contre!: number;

  @Column(DataType.INTEGER)
  num_abstention!: number;

  @Column(DataType.ARRAY(DataType.STRING))
  non_votants!: string[];

  @Column(DataType.INTEGER)
  num_non_votants!: number;

  @Column(DataType.BOOLEAN)
  adopte?: boolean;

  @Column(DataType.INTEGER)
  num_absents!: number;

  @Column(DataType.ARRAY(DataType.STRING))
  votants_pour!: string[];

  @Column(DataType.ARRAY(DataType.STRING))
  votants_contre!: string[];

  @Column(DataType.ARRAY(DataType.STRING))
  votants_abstention!: string[];
}
