import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MinLength } from "class-validator";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";

export class VaccinationCenterCreateDto{

    @ApiProperty({
        example: 'VCN Đà Nẵng'
    })
    @IsString()
    name: string;  
    
    @ApiProperty({
        example: 'Hải Châu, Đà Nẵng'
    })
    @IsString()
    address: string;  
    
    @ApiProperty({
        example: '0111222333'
    })
    @MinLength(9, { message: createExceptionMessage(ExceptionEnum.INVALID_PHONE_NUMBER)})
    @IsString()
    phone: string;  

    @ApiProperty({
        example: '200'
    })
    @IsNumber()
    capacity: number;
}