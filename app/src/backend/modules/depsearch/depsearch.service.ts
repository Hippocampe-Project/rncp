import { Injectable } from "@nestjs/common";
import { Deputes } from "models/deputes.model";
import { DeputeRepository } from "repositories/deputes.repository"; // Import repository

@Injectable()
export class DepsearchService {
  constructor(private deputeRepository: DeputeRepository) {} // Inject repository

  async getDeputeByName(deputeName: string) {
    return this.deputeRepository.findDepute(deputeName);
  }
}
