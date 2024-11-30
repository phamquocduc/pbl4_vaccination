import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
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
        example: 3
    })
    @IsNumber()
    @Transform(({value}) => Number(value))
    doseNumber: number

    @ApiProperty({
        example: 10
    })
    @IsNumber()
    @Transform(({value}) => Number(value))
    durationIntervals: number

    @ApiProperty({
        example: 1653
    })
    @IsNumber()
    @Transform(({value}) => Number(value))
    availableDoses: number;

    @ApiProperty({
        example: 700000
    })
    @IsNumber()
    @Transform(({value}) => Number(value))
    price: number;
    
    @ApiProperty({
        example: ''
    })
    @IsArray()
    @IsOptional()
    images?: string[];
}