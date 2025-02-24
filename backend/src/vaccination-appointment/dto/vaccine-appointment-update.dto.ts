import { IsString, IsDate, IsOptional, IsEnum, IsNumber, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EPaymentMethod, EVNPaymentMethod } from 'src/enums/vaccine-reservation-payment-method.enum';

export class VaccineAppointmentUpdateDto {

    @ApiProperty({
        example: '2024-04-15'
    })
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    appointmentDate?: Date;

    @ApiProperty({ 
        example: '2024-04-29'
    })
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    nextAppointmentDate?: Date;

    @ApiProperty({ 
        example: true
    })
    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;
}