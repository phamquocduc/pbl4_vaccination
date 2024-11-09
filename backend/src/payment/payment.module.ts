import { Module } from "@nestjs/common";
import { VNPayService } from "./vnpay.service";
import { VNPayController } from "./vnpay.controller";

@Module({
    imports:[
    ],
    controllers: [
        VNPayController
    ],
    providers: [
        VNPayService,
    ],
    exports: [

    ]
})
export class PaymentModule {}