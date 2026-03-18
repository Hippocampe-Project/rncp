import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class VoteDeputeDto {
  @Field(() => Int)
  vote_id!: number;

  @Field(() => Int)
  depute_id!: number;

  @Field()
  vote_category!: string;

  @Field()
  depute_nom!: string;

  @Field()
  vote_titre!: string;
}
