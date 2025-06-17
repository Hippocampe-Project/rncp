"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const sequelize_typescript_1 = require("sequelize-typescript");
const platform_express_1 = require("@nestjs/platform-express");
const global_exception_filter_1 = require("./global-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter());
    const sequelize = app.get(sequelize_typescript_1.Sequelize);
    console.log("Sequelize has been loaded!");
    app.enableCors();
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map