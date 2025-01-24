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
  tableName: "scrutins",
  timestamps: false,
})
export class Scrutins extends Model<
  InferAttributes<Scrutins>,
  InferCreationAttributes<Scrutins>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  titre!: string;

  @Column(DataType.STRING)
  dossier_legislatif?: string;

  @Column(DataType.STRING)
  date!: string;
  
  @Column(DataType.STRING)
  nom!: string;

  
}
