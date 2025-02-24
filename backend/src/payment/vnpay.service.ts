import * as crypto from 'crypto';
import * as qs from 'qs';
import { CreatePaymentDto } from './dto/create-vnpay-payment.dto';
import { log } from 'console';
import * as os from 'os'
import * as moment from 'moment';
import { createVNPayMethodParam } from 'src/enums/vaccine-reservation-payment-method.enum';

export class VNPayService {
  private vnpUrl = process.env.VNPAY_PAYMENT_URL;
  private tmnCode = process.env.VNPAY_TMN_CODE;
  private hashSecret = process.env.VNPAY_HASH_SECRET;

  getLocalIp() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
      const interfaceInfo = networkInterfaces[interfaceName];
      if (interfaceInfo) {
        for (const net of interfaceInfo) {
          if (net.family === 'IPv4' && !net.internal) {
            return net.address; 
          }
        }
      }
    }
    return null;
  }

  createPaymentUrl(createPaymentDto: CreatePaymentDto) {
    const createDate = new Date();
    const expireDate = new Date(createDate.getTime() + 60 * 60 * 1000);

    const { orderInfo, amount, returnUrl } = createPaymentDto;

    let bankCode = createPaymentDto.vnp_BankCode ? createVNPayMethodParam(createPaymentDto.vnp_BankCode) : '';
    
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = this.tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderInfo;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderInfo;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = this.getLocalIp();
    vnp_Params['vnp_CreateDate'] = moment(createDate).format('YYYYMMDDHHmmss');
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = this.sortObject(vnp_Params)

    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", this.hashSecret);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    let vnpUrl = this.vnpUrl

    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

    return vnpUrl
  }

  sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj){
      if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
      }
    }
    str.sort();
      for (key = 0; key < str.length; key++) {
          sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
      }
      return sorted;
  }
}
