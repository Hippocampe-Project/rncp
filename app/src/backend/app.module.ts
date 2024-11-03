import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DepsearchModule } from './modules/depsearch/depsearch.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Deputes } from './models/deputes.model';
import { Votes } from './models/votes.model';
import { Scrutin } from './models/scrutins.model';
import { DeputeRepository } from './repositories/deputes.repository';
import { VoteRepository } from './repositories/votes.repository';
import { PartiRepository } from './repositories/partis.repository';
import { DeputeService } from './services/deputes.service';
import { VoteService } from './services/votes.service';
import { PartiService } from './services/partis.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    DepsearchModule,
  ],
})
export class AppModule {}