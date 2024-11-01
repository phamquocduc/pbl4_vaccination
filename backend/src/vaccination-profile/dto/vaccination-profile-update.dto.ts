import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, IsDate, IsEmail, MinLength } from "class-validator";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";
import { EGender } from "src/enums/gender.enum";
import { ERelationship } from "src/enums/relationship.enum";

export class UpdateVaccinationProfileDto {
    @ApiProperty({
        example: 'Nguyen Van A'
    })
    @IsOptional()
    @IsString()
    fullName?: string;  // Họ và tên của người được tiêm

    @ApiProperty({
        example: ERelationship.FAMILY_MEMBERS
    })
    @IsOptional()
    @IsString()
    relationship?: ERelationship;  

    @ApiProperty({
        example: '2004-10-15'
    })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateOfBirth?: Date;  

    @ApiProperty({
        example: EGender.FEMALE
    })
    @IsOptional()
    @IsString()
    gender?: EGender;  

    @ApiProperty({
        example: '0123456789'
    })
    @IsString()
    @MinLength(9, { message: createExceptionMessage(ExceptionEnum.INVALID_PHONE_NUMBER)})
    phone?: string;  

    @ApiProperty({
        example: 'abcd@gmail.com'
    })
    @IsOptional()
    @IsEmail()
    email?: string;  

    @ApiProperty({
        example: 'Quảng Nam'
    })
    @IsOptional()
    @IsString()
    address?: string;  
}