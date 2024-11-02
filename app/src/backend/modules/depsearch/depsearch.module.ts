import { Module } from '@nestjs/common';
import { DepsearchResolver } from './depsearch.resolver';
import { DepsearchService } from './depsearch.service';

@Module({
  providers: [DepsearchResolver, DepsearchService],
})
export class DepsearchModule {}
