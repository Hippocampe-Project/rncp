import { Module } from '@nestjs/common';
import { DepsearchResolver } from './depsearch.resolver';
import { DepsearchService } from './depsearch.service';
import { DeputeRepository } from 'repositories/deputes.repository'

@Module({
  providers: [DepsearchResolver, DepsearchService, DeputeRepository],
})
export class DepsearchModule {}
