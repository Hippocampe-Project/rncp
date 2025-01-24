import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { DepsearchService } from "./depsearch.service";
import { Deputes } from "../../models/deputes.model";

@Resolver(() => Deputes)
export class DepsearchResolver {
  constructor(private depsearchService: DepsearchService) {}

  //@Query marks the following query method as a graphQL handler and allows from specifying the return type of the query + data extraction
  @Query(() => Deputes, { nullable: true })
  //@Args works with @Query to specify that the expected argument comes from a graphQL query.
  //'id' should be written in the query and specifies which value in the DB should be passed to 'deputeId'
  //the type specification is a function that returns a type rather than a plain type, to avoid circular dependency (get back on that)
  async depute(@Args("id", { type: () => Int }) deputeId: number) {
    return this.depsearchService.findDepute(deputeId);
  }

  //   @Mutation(() => Depsearch)
}
