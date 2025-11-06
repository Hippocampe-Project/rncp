import { Resolver, Query, Args } from "@nestjs/graphql";
import { DepsearchService } from "../../domain/depsearch/depsearch.service";
import { VotesDeputesService } from "../../domain/depsearch/votes-deputes.service";
import { Inject, Logger } from "@nestjs/common";
import { DeputeNotFoundError } from "../../domain/depsearch/depsearch.errors";
import { Votes_deputes } from "../../infrastructure/models/votes-deputes.model";
import { VoteDeputeDto } from "../DTO/votes-deputes";

export type Depsearch = {
  vote_id: number;
  depute_id: number;
  vote_category: string;
  depute_nom: string;
  vote_titre: string;
};

@Resolver(() => [Votes_deputes])
export class DepsearchResolver {
  constructor(
    @Inject("IVotesDeputesService")
    private votesDeputeService: VotesDeputesService,
    private depsearchService: DepsearchService
  ) {}

  logger = Logger;

  //@Query marks the following query method as a graphQL handler and allows from specifying the return type of the query + data extraction
  @Query(() => [VoteDeputeDto], { nullable: true })

  //@Args works with @Query to specify that the expected argument comes from a graphQL query.
  //'nom' should be written in the query and specifies which value in the DB should be passed to 'deputeName'
  //the type specification is a function that returns a type rather than a plain type, to avoid circular dependency (get back on that)
  public async depute(
    // @Context() request: RequestWithContext,
    @Args("nom", { type: () => String }) deputeName: string
  ): Promise<VoteDeputeDto[]> {
    console.log("Incoming query", deputeName);
    this.logger.debug({ deputeName }, "Trying to resolve Query.depsearch");

    const deputeId = await this.votesDeputeService.createPayload(deputeName); // insert the votes in the database and return the deputeId
    if (!deputeName) {
      throw new DeputeNotFoundError(deputeName);
    }
    return this.depsearchService.retrievePayload(deputeId);
  }

  //create mapToRejection + mapToSuccess
}
