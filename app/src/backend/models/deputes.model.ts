import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { ObjectType, Field, Int, GraphQLISODateTime } from "@nestjs/graphql"; // GraphQL decorators
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
  @Field(() => Int) // @Field() marks this property to be exposed in GraphQL. Here, the id is exposed. On the other side of the relation, the relation itself will be exposed.
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
  @Field(() => Int)
  departement_id!: number;

  @Column(DataType.STRING)
  @Field()
  circonscription!: string;

  @Column(DataType.STRING)
  @Field(() => Int, { nullable: true }) // Nullable field
  commission_permanente_id?: number;

  @Column(DataType.STRING)
  @Field()
  profession!: string;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  suppleant?: string;

  @Column(DataType.STRING)
  @Field(() => Int)
  parti_id!: number;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  photo?: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  @Field()
  activite!: boolean;

  @Column(DataType.DATE)
  @Field(() => GraphQLISODateTime)
  activite_timestamp?: Date;
}
