import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import {
    createExceptionMessage,
    ExceptionEnum,
} from 'src/enums/exception.enum';
import { ERole } from 'src/enums/role.enum';

export class UserCreateDto {
    @ApiProperty({
        example: 'Nguyen Van A',
    })
    @IsString()
    fullName?: string;

    @ApiProperty({
        example: 'abc@gmail.com',
    })
    @IsEmail()
    email?: string;

    @ApiProperty({
        example: '12345678',
    })
    @IsString()
    @MinLength(8, {
        message: createExceptionMessage(ExceptionEnum.PASSWORD_INVALID),
    })
    passWord?: string;

    @ApiProperty({
        example: '12345678',
    })
    @IsString()
    @MinLength(8, {
        message: createExceptionMessage(ExceptionEnum.PASSWORD_INVALID),
    })
    confirmPassWord?: string;

    @ApiProperty({
        example: ERole.STAFF,
    })
    @IsString()
    @IsOptional()
    role?: ERole;
}
