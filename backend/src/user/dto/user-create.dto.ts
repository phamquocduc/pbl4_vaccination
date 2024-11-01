import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum"

export class UserCreateDto{
    
    @ApiProperty({
        example: 'Nguyen'
    })
    @IsString()
    firstName?: string

    @ApiProperty({
        example: 'Van A'
    })
    @IsString()
    lastName?: string

    @ApiProperty({
        example: 'abc@gamil.com'
    })
    @IsEmail()
    email?: string

    @ApiProperty({
        example: '12345678'
    })
    @IsString()
    @MinLength(8, { message: createExceptionMessage(ExceptionEnum.PASSWORD_INVALID)})
    passWord?: string

    @ApiProperty({
        example: '12345678'
    })
    @IsString()
    @MinLength(8, { message: createExceptionMessage(ExceptionEnum.PASSWORD_INVALID)})
    confirmPassWord?: string
}