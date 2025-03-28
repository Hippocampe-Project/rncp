import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { ObjectType, Field } from "@nestjs/graphql"; // GraphQL decorators
import { Votes_deputes } from "./votes-deputes.model";

@ObjectType() // This marks the class as a GraphQL object type
@Table({
  tableName: "deputes",
  timestamps: false,
})
export class Deputes extends Model {
  @PrimaryKey
  @AutoIncrement
  @ForeignKey(() => Votes_deputes)
  @Column(DataType.INTEGER)
  @Field(() => Number) // @Field() marks this property to be exposed in GraphQL
  id!: number;

  @Column(DataType.STRING)
  @Field() // GraphQL will treat this as a String
  nom!: string;

  @Column(DataType.STRING)
  @Field()
  date_naissance!: string;

  @Column(DataType.STRING)
  @Field()
  sexe!: string;

  @Column(DataType.STRING)
  @Field(() => Number)
  departement_id!: number;

  @Column(DataType.STRING)
  @Field()
  circonscription!: string;

  @Column(DataType.STRING)
  @Field(() => Number, { nullable: true }) // Nullable field
  commission_permanente_id?: number;

  @Column(DataType.STRING)
  @Field()
  profession!: string;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  suppleant?: string;

  @Column(DataType.STRING)
  @Field(() => Number)
  parti_id!: number;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  photo?: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  @Field(() => Boolean)
  activite!: boolean;

  @Column(DataType.DATE)
  @Field(() => Date)
  activite_timestamp: Date;
}
