import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";

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
}
