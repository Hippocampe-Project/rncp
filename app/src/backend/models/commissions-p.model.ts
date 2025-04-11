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
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Table({
  tableName: "commissions_p",
  timestamps: false,
})
export class CommissionsPermanentes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Field(() => Int)
  id!: number;

  @Column(DataType.STRING)
  @Field()
  nom!: string;

  @Column(DataType.STRING)
  @Field()
  objet!: string;

  // @HasMany(() => Deputes)
  // deputes_id?: Deputes[];

  @Column(DataType.STRING)
  @Field(() => [String])
  deputes?: string[];

  //BLOB = Binary Large OBject
  @Column(DataType.STRING)
  @Field({ nullable: true })
  logo?: string;
}
