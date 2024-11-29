"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const sequelize_typescript_1 = require("sequelize-typescript");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const sequelize = app.get(sequelize_typescript_1.Sequelize);
    await sequelize.sync({ alter: true });
    console.log('Sequelize has been synced!');
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map