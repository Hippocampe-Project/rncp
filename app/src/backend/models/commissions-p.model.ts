import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Deputes } from "./deputes.model";

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
  nom!: string;

  @Column(DataType.STRING)
  objet!: string;

  @HasMany(() => Deputes)
  Deputesid?: Deputes[];

  @Column(DataType.STRING)
  deputes?: string[];

  //BLOB = Binary Large OBject
  @Column(DataType.BLOB)
  logo!: Blob;
}
