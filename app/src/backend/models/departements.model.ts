import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Deputes } from "./deputes.model";

@Table({
  tableName: "departements",
  timestamps: false,
})
export class Departements extends Model<
  InferAttributes<Departements>,
  InferCreationAttributes<Departements>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  nom!: string;

  //Model level decorator. Establishes a one-to-many relationship with the Deputes table,
  //without it being a column here.
  // @HasMany(() => Deputes, "departement_name")
  // deputes?: Deputes[];
}
