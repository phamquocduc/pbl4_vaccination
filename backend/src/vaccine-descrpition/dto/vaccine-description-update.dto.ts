import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class VaccineDescriptionUpdateDto {


    @ApiProperty({
        example: '0.5 ml'
    })
    @IsOptional()
    @IsString()
    dosage?: string;

    @ApiProperty({
        example: 'Tiêm bắp'
    })
    @IsOptional()
    @IsString()
    injectionRoute?: string;

    @ApiProperty({
        example: '18-65 tuổi'
    })
    @IsOptional()
    @IsString()
    recommendedAgeGroup?: string;

    @ApiProperty({
        example: '2 liều, Mỗi liều cách nhau 4 tuần'
    })
    @IsOptional()
    @IsString()
    schedule?: string;

    @ApiProperty({
        example: 'Sốt nhẹ, mệt mỏi'
    })
    @IsOptional()
    @IsString()
    adverseEffects?: string;

    @ApiProperty({
        example: '2-8°C'
    })
    @IsOptional()
    @IsString()
    storage?: string;

    @ApiProperty({
        example: 'Vaccine này có hiệu quả chống lại.....'
    })
    @IsOptional()
    @IsString()
    detailedDescription?: string;
}