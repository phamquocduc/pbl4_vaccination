import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MinLength } from "class-validator";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";

export class VaccineCreateDto{

    @ApiProperty({
        example: 'CV-19-DCV Covid-19'
    })
    @IsString()
    name: string;  

    @ApiProperty({
        example: 'Mỹ'
    })
    @IsString()
    origin: string; 
    
    @ApiProperty({
        example: 'Tiêm dưới da'
    })
    @IsString()
    type: string;

    @ApiProperty({
        example: 'Phòng ngừa Covid-19'
    })
    @IsString()
    effect: string; 

    @ApiProperty({
        example: 1653
    })
    @IsNumber()
    availableDoses: number;

    @ApiProperty({
        example: 700000
    })
    @IsNumber()
    price: number;  
}