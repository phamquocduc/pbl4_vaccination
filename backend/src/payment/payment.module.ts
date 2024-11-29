import { forwardRef, Module } from "@nestjs/common";
import { VNPayService } from "./vnpay.service";
import { VNPayController } from "./vnpay.controller";
import { VaccineReservationModule } from "src/vaccine-reservation/vaccine-reservation.module";
import { VaccinationAppointmentModule } from "src/vaccination-appointment/vaccination-appointment.module";

@Module({
    imports:[
        forwardRef(() => VaccineReservationModule),
        forwardRef(() => VaccinationAppointmentModule)
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