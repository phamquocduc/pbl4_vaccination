import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';
import { VNPayService } from './vnpay.service';
import { CreatePaymentDto } from './dto/create-vnpay-payment.dto';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { log } from 'console';
import { Public } from 'src/auth/decorators/public.decorator';
import { VaccineReservationServices } from 'src/vaccine-reservation/vaccine-reservation.services';
import { VaccinationAppointmentServices } from 'src/vaccination-appointment/vaccination-appointment.services';

@ApiBearerAuth()
@ApiTags('vnpay')
@Controller('vnpay')
export class VNPayController {
  constructor(
    private readonly vnpayService: VNPayService,
    private readonly vaccineReservationServices: VaccineReservationServices,
    private readonly vaccineAppointmentServices: VaccinationAppointmentServices,
  ) {}

  private hashSecret = process.env.VNPAY_HASH_SECRET;

  @Post('create-payment')
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    const paymentUrl = this.vnpayService.createPaymentUrl(createPaymentDto);
    return {
      paymentUrl: paymentUrl
    }
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
    
    if (vnp_SecureHash === signed) {
      const vnp_ResponseCode = vnp_Params.vnp_ResponseCode
      switch(vnp_ResponseCode){
        case '24':
          return {
            code: 1000,
            success: false,
            message: 'Người dùng hủy thanh toán'
          }
        case '00':
          const orderId = vnp_Params.vnp_TxnRef
          const vaccineReservation = await this.vaccineReservationServices.getByOrderId(orderId)
          await this.vaccineAppointmentServices.create(vaccineReservation)
          await this.vaccineReservationServices.update(orderId)
          return {
            code: 1001,
            success: true,
            message: 'Thanh toán thành công'
          }
      }
    } else {
      return { success: false, message: 'Invalid payment.' };
    }
  }
}
