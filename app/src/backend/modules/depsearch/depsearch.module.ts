import { Module } from "@nestjs/common";
import { DepsearchResolver } from "./depsearch.resolver";
import { DepsearchService } from "./depsearch.service";
import { DeputeRepository } from "../../repositories/deputes.repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { Deputes } from "models/deputes.model";
import { VoteRepository } from "repositories/votes.repository";
import { Votes } from "models/votes.model";

// DepsearchModule acts as the intermediary that connects:

//     The Deputes model (database layer)
//     The DeputeRepository (data access layer)
//     The DepsearchService (business logic layer)
//     The DepsearchResolver (GraphQL API layer)

@Module({
  imports: [SequelizeModule.forFeature([Deputes, Votes])],

  providers: [
    DepsearchResolver,
    DepsearchService,
    DeputeRepository,
    VoteRepository,
  ],
  exports: [DeputeRepository, VoteRepository],
})
export class DepsearchModule {}
