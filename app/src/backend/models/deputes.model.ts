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
  date_naissance!: string;

  @Column(DataType.STRING)
  sexe!: string;

  @Column(DataType.STRING)
  departement_name!: string;

  //Model level decorator. Establishes a one-to-many relationship with Departments model. Allows sequelize to automatize data fetching.
  // @BelongsTo(() => Departements, "departement_name")
  // departement!: Departements;

  @Column(DataType.STRING)
  circonscription!: string;

  @Column(DataType.STRING)
  commission_permanente_name?: string;

  //Model level decorator. Establishes a one-to-one relationship with CommissionsPermanentes model. Allows sequelize to automatize data fetching.
  // @BelongsTo(() => CommissionsPermanentes)
  // commissionPermanente?: CommissionsPermanentes;

  @Column(DataType.STRING)
  profession!: string;

  @Column(DataType.STRING)
  suppleant?: string;

  @Column(DataType.STRING)
  parti_name!: string;

  //Model level decorator. Establishes a one-to-one relationship with Partis model. Allows sequelize to automatize data fetching.
  // @BelongsTo(() => Partis)
  // parti!: Partis;

  //BLOB = Binary Large OBject
  @Column(DataType.STRING)
  photo?: string;
}
