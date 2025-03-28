import { Resolver, Query, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { Deputes } from "../../models/deputes.model";
import { DepsearchService } from "./depsearch.service";
import { VotesDeputesService } from "./votes-deputes.service";
import { Logger } from "@nestjs/common";

export type Depsearch = {
  vote_id: number;
  depute_id: number;
  vote_category: string;
  depute_nom: string;
  vote_titre: string;
};

@Resolver(() => Deputes)
export class DepsearchResolver {
  constructor(
    private depsearchService: DepsearchService,
    private votesDeputeService: VotesDeputesService,
  ) {}

  logger = Logger;

  //@Query marks the following query method as a graphQL handler and allows from specifying the return type of the query + data extraction
  @Query(() => Deputes, { nullable: true })

  //@Args works with @Query to specify that the expected argument comes from a graphQL query.
  //'nom' should be written in the query and specifies which value in the DB should be passed to 'deputeName'
  //the type specification is a function that returns a type rather than a plain type, to avoid circular dependency (get back on that)
  public async depute(
    // @Context() request: RequestWithContext,
    @Args("nom", { type: () => String }) deputeName: string,
  ): Promise<Depsearch[]> {
    this.logger.debug({ deputeName }, "Trying to resolve Query.depsearch");

    const deputeId = await this.votesDeputeService.createPayload(deputeName); // insert the votes in the database and return the deputeId

    return this.depsearchService.retrievePayload(deputeId);
  }

  //create mapToRejection + mapToSuccess
}
