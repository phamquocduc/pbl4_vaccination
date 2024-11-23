import { forwardRef, Module } from "@nestjs/common";
import { VNPayService } from "./vnpay.service";
import { VNPayController } from "./vnpay.controller";
import { VaccineReservationModule } from "src/vaccine-reservation/vaccine-reservation.module";

@Module({
    imports:[
        forwardRef(() => VaccineReservationModule)
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