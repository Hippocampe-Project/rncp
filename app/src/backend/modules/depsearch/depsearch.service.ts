import { Injectable } from "@nestjs/common";
import { DeputeRepository } from "repositories/deputes.repository"; // Import repository

@Injectable()
export class DepsearchService {
  constructor(private deputeRepository: DeputeRepository) {} // Inject repository

  async findDepute(deputeName: string) {
    return this.deputeRepository.findDepute(deputeName); // Call repository method
  }
}
