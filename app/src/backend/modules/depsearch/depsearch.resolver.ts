import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepsearchService } from './depsearch.service';
import { Deputes } from '../../models/deputes.model';

@Resolver(() => Deputes)
<<<<<<< HEAD
export class DeputesResolver {
=======
export class DepsearchResolver {
>>>>>>> 1be774d8 (Reconstruction après avoir bossé 2h pour rien)
  constructor(private depsearchService: DepsearchService) {}

  @Query(() => [Deputes])
  async deputes() {
    return this.depsearchService.findAll();
  }

//   @Mutation(() => Depsearch)

}
