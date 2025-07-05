import { Partis } from "../models/partis.model";
export declare class PartiRepository {
    private readonly partiModel;
    constructor(partiModel: typeof Partis);
    findAll(): Promise<Partis[]>;
    findOne(id: number): Promise<Partis>;
    update(id: number, updatePartiDto: any): Promise<[number, Partis[]]>;
    delete(id: number): Promise<void>;
}
