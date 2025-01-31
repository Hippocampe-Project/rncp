import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from "sequelize-typescript";
import { ObjectType, Field } from "@nestjs/graphql"; // GraphQL decorators

@ObjectType() // This marks the class as a GraphQL object type
@Table({
  tableName: "deputes",
  timestamps: false,
})
export class Deputes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Field(() => Number) // @Field() marks this property to be exposed in GraphQL
  id!: number;

  @Column(DataType.STRING)
  @Field() // GraphQL will treat this as a String
  nom!: string;

  @Column(DataType.STRING)
  @Field() // GraphQL will treat this as a String
  date_naissance!: string;

  @Column(DataType.STRING)
  @Field() // GraphQL will treat this as a String
  sexe!: string;

  @Column(DataType.STRING)
  @Field(() => Number)
  departement_id!: number;

  @Column(DataType.STRING)
  @Field() // GraphQL will treat this as a String
  circonscription!: string;

  @Column(DataType.STRING)
  @Field(() => Number, { nullable: true }) // Nullable field
  commission_permanente_id?: number;

  @Column(DataType.STRING)
  @Field() // GraphQL will treat this as a String
  profession!: string;

  @Column(DataType.STRING)
  @Field({ nullable: true }) // Nullable field
  suppleant?: string;

  @Column(DataType.STRING)
  @Field(() => Number)
  parti_id!: number;

  @Column(DataType.STRING)
  @Field({ nullable: true }) // Nullable field
  photo?: string;
}
