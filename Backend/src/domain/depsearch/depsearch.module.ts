import { Module } from "@nestjs/common";
import { DepsearchResolver } from "../../presentation/resolvers/depsearch.resolver";
import { DepsearchService } from "./depsearch.service";
import { DeputeRepository } from "../../infrastructure/repositories/deputes.repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { Deputes } from "../../infrastructure/models/deputes.model";
import { VoteRepository } from "../../infrastructure/repositories/votes.repository";
import { Votes } from "../../infrastructure/models/votes.model";
import { VotesDeputesService } from "./votes-deputes.service";
import { VotesDeputesRepository } from "../../infrastructure/repositories/votes-deputes.repository";
import { Votes_deputes } from "../../infrastructure/models/votes-deputes.model";

// DepsearchModule acts as the intermediary that connects:

//     The Deputes model (database layer)
//     The DeputeRepository (data access layer)
//     The DepsearchService (business logic layer)
//     The DepsearchResolver (GraphQL API layer)

@Module({
  imports: [SequelizeModule.forFeature([Deputes, Votes, Votes_deputes])],

  providers: [
    DepsearchResolver,
    VotesDeputesService,
    {
      provide: "IVotesDeputesService",
      useClass: VotesDeputesService,
    },
    DepsearchService,
    VotesDeputesRepository,
    DeputeRepository,
    VoteRepository,
  ],
  exports: [
    DeputeRepository,
    VoteRepository,
    VotesDeputesRepository,
    "IVotesDeputesService",
  ],
})
export class DepsearchModule {}
