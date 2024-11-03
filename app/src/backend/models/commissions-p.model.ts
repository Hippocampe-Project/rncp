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
  tableName: "commissions-p",
  timestamps: false,
})
export class CommissionsPermanentes extends Model<
  InferAttributes<CommissionsPermanentes>,
  InferCreationAttributes<CommissionsPermanentes>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  nom: string;

  @Column(DataType.STRING)
  objet: string;
}
