import { IsDate, IsEmail, IsPhoneNumber, IsString, MinLength } from "class-validator"
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum"
import { ERelationship } from "../../enums/relationship.enum";
import { EGender } from "../../enums/gender.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class VaccinationProfileCreateDto{

    @ApiProperty({
        example: 'Nguyen Van A'
    })
    @IsString()
    fullName: string; 

    @ApiProperty({
        example: ERelationship.FAMILY_MEMBERS
    })
    @IsString()
    relationship: ERelationship; 

    @ApiProperty({
        example: '2024-04-15'
    })
    @IsDate()
    @Type(() => Date)
    dateOfBirth: Date;

    @ApiProperty({
        example: EGender.MALE
    })
    @IsString()
    gender: EGender; 

    @ApiProperty({
        example: '0123456789'
    })
    @IsString()
    @MinLength(9, { message: createExceptionMessage(ExceptionEnum.INVALID_PHONE_NUMBER)})
    phone: string; 

    @ApiProperty({
        example: 'abc@gmail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Dà Nẵng'
    })
    @IsString()
    address: string; 
}