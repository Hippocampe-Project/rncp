import { DeputeRepository } from "repositories/deputes.repository";
export declare class DepsearchService {
    private deputeRepository;
    constructor(deputeRepository: DeputeRepository);
    getDeputeByName(deputeName: string): Promise<any>;
}
