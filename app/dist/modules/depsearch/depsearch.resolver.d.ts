import { DepsearchService } from './depsearch.service';
import { Deputes } from '../../models/deputes.model';
export declare class DeputesResolver {
    private depsearchService;
    constructor(depsearchService: DepsearchService);
    deputes(): Promise<Deputes[]>;
}
