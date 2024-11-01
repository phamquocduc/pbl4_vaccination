import { HttpException, HttpStatus } from "@nestjs/common"
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler"

export class CustomAppException<T> extends HttpException{
    constructor(message: T, code: HttpStatus){
        super(message, code)
    }
}