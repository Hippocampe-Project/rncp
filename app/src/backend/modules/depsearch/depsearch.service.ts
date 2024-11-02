import { Injectable } from '@nestjs/common';
import { Deputes } from '../../models/deputes.model';

@Injectable()
export class DepsearchService {
  private deputes: Deputes[] = [];

  findAll(): Deputes[] {
    return this.deputes;
  }

//   create(xxx: xxx): xxx {

//   }
}
