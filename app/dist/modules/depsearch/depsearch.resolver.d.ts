import { Deputes } from "../../models/deputes.model";
import { DeputeRepository } from "../../repositories/deputes.repository";
export declare class DepsearchResolver {
    private deputeRepository;
    constructor(deputeRepository: DeputeRepository);
    depute(deputeName: string): Promise<import("sequelize").InferAttributes<Deputes, {
        omit: never;
    }>>;
}
