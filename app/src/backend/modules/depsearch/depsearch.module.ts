import { Module } from "@nestjs/common";
import { DepsearchResolver } from "./depsearch.resolver";
import { DepsearchService } from "./depsearch.service";
import { DeputeRepository } from "../../repositories/deputes.repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { Deputes } from "models/deputes.model";

// DepsearchModule acts as the intermediary that connects:

//     The Deputes model (database layer)
//     The DeputeRepository (data access layer)
//     The DepsearchService (business logic layer)
//     The DepsearchResolver (GraphQL API layer)

@Module({
  imports: [SequelizeModule.forFeature([Deputes])], // Register Deputes model
  providers: [DepsearchResolver, DepsearchService, DeputeRepository],
  exports: [DeputeRepository], // Export repository if needed elsewhere
})
export class DepsearchModule {}
