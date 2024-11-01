import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum"

export class ChangePasswordDto{
    @ApiProperty({
        example: '12345679'
    })
    @IsString()
    currPassword: string

    @ApiProperty({
        example: '12345678'
    })
    @IsString()
    @MinLength(8, { message: createExceptionMessage(ExceptionEnum.PASSWORD_INVALID)})
    newPassword: string

    @ApiProperty({
        example: '12345678'
    })
    @IsString()
    @MinLength(8, { message: createExceptionMessage(ExceptionEnum.PASSWORD_INVALID)})
    confirmNewPassword: string
}