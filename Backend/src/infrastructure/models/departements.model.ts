import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
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
  @Field(() => Int)
  id!: number;

  @Column(DataType.STRING)
  @Field()
  nom!: string;

  //Model level decorator. Establishes a one-to-many relationship with the Deputes table,
  //without it being a column here.
  // @HasMany(() => Deputes, "departement_name")
  // deputes?: Deputes[];
}
