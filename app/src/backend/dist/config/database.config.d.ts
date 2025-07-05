import { OnModuleInit } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
declare const _default: () => {
    database: {
        dialect: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
};
export default _default;
export declare class DatabaseService implements OnModuleInit {
    private sequelize;
    constructor(sequelize: Sequelize);
    onModuleInit(): Promise<void>;
}
