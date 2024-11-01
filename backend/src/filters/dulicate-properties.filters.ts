import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { ExecutionContext } from "@nestjs/common";
import { log } from "console";
import { Response } from "express";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class DuplicatePropertiesFilter extends ExceptionsHandler{
  
    catch(exception: QueryFailedError, host: ArgumentsHost){

        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = HttpStatus.BAD_REQUEST

        if (exception.message.includes('Duplicate entry')) {
            response.status(Number(status)).json({
              statusCode: status,
              message: createExceptionMessage(ExceptionEnum.DULICATE_PROPERTIES),
              error: 'error',
            });
        }else{
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
            });
        }
    }
}