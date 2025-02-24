import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";

export class VaccineUpdateDto{

    @ApiProperty({
        example: 'CV-19-DCV Covid-19'
    })
    @IsString()
    @IsOptional()
    name?: string;  

    @ApiProperty({
        example: 'Mỹ'
    })
    @IsString()
    @IsOptional()
    origin?: string; 
    
    @ApiProperty({
        example: 'Tiêm dưới da'
    })
    @IsString()
    @IsOptional()
    type?: string;

    @ApiProperty({
        example: 'Phòng ngừa Covid-19'
    })
    @IsString()
    @IsOptional()
    effect?: string; 

    @ApiProperty({
        example: 1653
    })
    @IsNumber()
    @IsOptional()
    @Transform(({value}) => Number(value))
    availableDoses?: number;

    @ApiProperty({
        example: 3
    })
    @IsNumber()
    @IsOptional()
    @Transform(({value}) => Number(value))
    doseNumber: number

    @ApiProperty({
        example: 700000
    })
    @IsNumber()
    @IsOptional()
    @Transform(({value}) => Number(value))
    price?: number;  

    @ApiProperty({
        example: ''
    })
    @IsArray()
    @IsOptional()
    images?: string[];
}