import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { GqlArgumentsHost } from "@nestjs/graphql";
import { Response } from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {

    const isGraphQL = host.getArgByIndex(3); 

    if (isGraphQL) {
      const gqlHost = GqlArgumentsHost.create(host);
      console.error("GraphQL Error:", exception);

      if (exception instanceof HttpException) {
        throw new Error(exception.message);
      } else if (exception instanceof Error) {
        throw new Error(exception.message || "Internal Server Error");
      } else {
        throw new Error("Unknown error occurred");
      }
    }

    // HTTP Exception Handling (REST API)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    } else {
      response.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  }
}
