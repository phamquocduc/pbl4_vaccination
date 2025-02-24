import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class VaccineInventoryUpdateDto {

    @ApiProperty({
        example: 'Kho trung tâm'
    })
    @IsOptional()
    @IsString()
    name?: string;  
    
    @ApiProperty({
        example: 10000
    })
    @IsOptional()
    @IsNumber()
    capacity?: number;
}