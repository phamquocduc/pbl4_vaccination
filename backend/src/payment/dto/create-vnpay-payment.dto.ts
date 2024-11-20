import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { EVNPaymentMethod } from 'src/enums/vaccine-reservation-payment-method.enum';

export class CreatePaymentDto {

  @ApiProperty({
    example: 'Thông tin đơn hàng'
  })
  @IsNotEmpty()
  @IsString()
  orderInfo: string;

  @ApiProperty({
    example: 100000
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: EVNPaymentMethod.VNBANK
  })
  @IsNotEmpty()
  @IsString()
  vnp_BankCode: string

  @ApiProperty({
    example: 'http://localhost:3000/vnpay/payment/return'
  })
  @IsNotEmpty()
  returnUrl: string;
}
