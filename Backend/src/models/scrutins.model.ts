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
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
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
  @Field(() => Int)
  id!: number;

  @Column(DataType.STRING)
  @Field()
  titre!: string;

  @Column(DataType.STRING)
  @Field()
  dossier_legislatif?: string;

  @Column(DataType.STRING)
  @Field()
  date!: string;

  @Column(DataType.STRING)
  @Field()
  nom!: string;
}
