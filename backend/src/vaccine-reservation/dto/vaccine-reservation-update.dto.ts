import { IsString, IsDate, IsOptional, IsEnum, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EPaymentMethod, EVNPaymentMethod } from 'src/enums/vaccine-reservation-payment-method.enum';
import { EVaccineReservationStatus } from 'src/enums/vaccine-reservation.enum';

export class VaccineReservationUpdateDto {

    @ApiProperty({ 
        example: true
    })
    @IsString()
    @IsOptional()
    isPaid: boolean

    @ApiProperty({ 
        example: EVaccineReservationStatus.CONFIRMED
    })
    @IsString()
    @IsOptional()
    status: string;
}