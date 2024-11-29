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
import { Partis } from "./partis.model";
import { Departements } from "./departements.model";
import { CommissionsPermanentes } from "./commissions-p.model";
import { InferAttributes, InferCreationAttributes } from "sequelize";

@Table({
  tableName: "deputes",
  timestamps: false,
})
export class Deputes extends Model<
  InferAttributes<Deputes>,
  InferCreationAttributes<Deputes>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  nom!: string;

  @Column(DataType.STRING)
  dateNaissance!: Date;

  @Column(DataType.STRING)
  sexe!: string;

  //Table level decorator. Indicates that this column references the primary key of the foreign table, here under the name 'departement_id'.
  @ForeignKey(() => Departements)
  @Column(DataType.INTEGER)
  departement_id!: number;

  //Model level decorator. Establishes a one-to-one relationship with Departments model. Allows sequelize to automatize data fetching.
  @BelongsTo(() => Departements)
  departement!: Departements;

  @Column(DataType.STRING)
  circonscription!: number;

  //Table level decorator. Indicates that this column references the primary key of the foreign table, here under the name 'commissionPermanente_id'.
  @ForeignKey(() => CommissionsPermanentes)
  @Column(DataType.INTEGER)
  commissionPermanente_id!: number;

  //Model level decorator. Establishes a one-to-one relationship with CommissionsPermanentes model. Allows sequelize to automatize data fetching.
  @BelongsTo(() => CommissionsPermanentes)
  commissionPermanente!: CommissionsPermanentes;

  @Column(DataType.STRING)
  profession!: string;

  @Column(DataType.STRING)
  suppleant!: string;

  //Table level decorator. Indicates that this column references the primary key of the foreign table, here under the name 'parti_id'.
  @ForeignKey(() => Partis)
  @Column(DataType.INTEGER)
  parti_id!: number;

  //Model level decorator. Establishes a one-to-one relationship with Partis model. Allows sequelize to automatize data fetching.
  @BelongsTo(() => Partis)
  parti!: Partis;

  //BLOB = Binary Large OBject
  @Column(DataType.BLOB)
  photo!: Blob;
}
