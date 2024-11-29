import { Deputes } from "../models/deputes.model";
export declare class DeputeRepository {
    private readonly deputeModel;
    constructor(deputeModel: typeof Deputes);
    findAll(): Promise<Deputes[]>;
    findOne(id: number): Promise<Deputes>;
    update(id: number, updateDeputeDto: any): Promise<[number, Deputes[]]>;
    delete(id: number): Promise<void>;
}
