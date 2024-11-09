import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';
import { VNPayService } from './vnpay.service';
import { CreatePaymentDto } from './dto/create-vnpay-payment.dto';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { log } from 'console';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('vnpay')
@Controller('vnpay')
export class VNPayController {
  constructor(private readonly vnpayService: VNPayService) {}

  private hashSecret = process.env.VNPAY_HASH_SECRET;

  @Post('create-payment')
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @Res() res,
  ) {
    const paymentUrl = this.vnpayService.createPaymentUrl(createPaymentDto);
    return paymentUrl
  }

  @Public()
  @Get('payment/return')
  async handleReturn(@Query() vnp_Params: any) {
    log(vnp_Params)
    const vnp_SecureHash = vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHash;

    vnp_Params = this.vnpayService.sortObject(vnp_Params);


    let signData = qs.stringify(vnp_Params, { encode: false }); 
    let hmac = crypto.createHmac("sha512", this.hashSecret);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");  
  
    log(vnp_SecureHash)
    log(signed)
    
    if (vnp_SecureHash === signed) {
      // Xử lý thanh toán thành công
      return { success: true, message: 'Payment verified!' };
    } else {
      // Xử lý khi thanh toán không hợp lệ
      return { success: false, message: 'Invalid payment.' };
    }
  }
}
