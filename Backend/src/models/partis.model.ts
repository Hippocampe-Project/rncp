import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Table({
  tableName: "partis",
  timestamps: false,
})
export class Partis extends Model<Partis> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Field(() => Int)
  id!: number;

  @Column(DataType.STRING)
  @Field()
  nom!: string;

  //Table level decorator. Indicates that this column references the primary key of the foreign table, here under the name 'president_id'.
  // @ForeignKey(() => Deputes)
  @Column(DataType.STRING)
  @Field({ nullable: true })
  president?: string;

  //Model level decorator. Establishes a one-to-one relationship with Deputes model,and specifies where it is located in the present table ('president_id'). Allows sequelize to automatize data fetching.
  // @BelongsTo(() => Deputes, "presidentId")
  // president?: Deputes;

  @Column(DataType.STRING)
  @Field()
  title!: string;

  //Model level decorator. Establishes a one-to-many relationship with the Deputes table,
  //without it being a column here.
  // @HasMany(() => Deputes)
  // deputes?: Deputes[];
}
