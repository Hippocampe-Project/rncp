"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    catch(exception, host) {
        const isGraphQL = host.getArgByIndex(3);
        if (isGraphQL) {
            const gqlHost = graphql_1.GqlArgumentsHost.create(host);
            console.error("GraphQL Error:", exception);
            if (exception instanceof common_1.HttpException) {
                throw new Error(exception.message);
            }
            else if (exception instanceof Error) {
                throw new Error(exception.message || "Internal Server Error");
            }
            else {
                throw new Error("Unknown error occurred");
            }
        }
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            response.status(status).json({
                statusCode: status,
                message: exception.message,
            });
        }
        else {
            response.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map