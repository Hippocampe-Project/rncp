import { Deputes } from "../models/deputes.model";
import { InferAttributes } from "sequelize";
export declare class DeputeRepository {
    private readonly deputeModel;
    constructor(deputeModel: typeof Deputes);
    findDeputeByName(deputeName: string): Promise<InferAttributes<Deputes> | null>;
}
