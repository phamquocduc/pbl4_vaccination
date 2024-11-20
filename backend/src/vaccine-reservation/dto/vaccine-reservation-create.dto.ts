import { IsString, IsDate, IsOptional, IsEnum, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EPaymentMethod, EVNPaymentMethod } from 'src/enums/vaccine-reservation-payment-method.enum';

export class VaccineReservationCreateDto {

    @ApiProperty({ 
        example: 2
    })
    @IsNumber()
    profileId: number;

    @ApiProperty({ 
        example: [1,2]
    })
    @IsArray()
    vaccineIds: number[];

    @ApiProperty({ 
        example: 3
    })
    @IsNumber()
    vaccinationCenterId: number;

    @ApiProperty({
        example: '2024-04-15'
    })
    @IsDate()
    @Type(() => Date)
    appointmentDate: Date;

    @ApiProperty({ 
        example: EVNPaymentMethod.VNBANK
    })
    @IsString()
    paymentMethod: string;
}