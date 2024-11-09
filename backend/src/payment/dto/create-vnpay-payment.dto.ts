import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

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
    example: 'http://localhost:3000/vnpay/payment/return'
  })
  @IsNotEmpty()
  returnUrl: string;
}
