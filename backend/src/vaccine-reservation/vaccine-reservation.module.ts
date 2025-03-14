import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccineReservation } from "./vaccine-reservation.entity";
import { VaccineReservationController } from "./vaccine-reservation.controller";
import { VaccineReservationServices } from "./vaccine-reservation.services";
import { VaccinereservationRepository } from "./vaccine-reservation.repository";
import { UserModule } from "src/user/user.module";
import { VaccineModule } from "src/vaccine/vaccine.module";
import { PaymentModule } from "src/payment/payment.module";
import { VaccinationAppointmentModule } from "src/vaccination-appointment/vaccination-appointment.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([VaccineReservation]),
        forwardRef(() => UserModule),
        forwardRef(() => VaccineModule),
        forwardRef(() => PaymentModule),
        forwardRef(() => VaccinationAppointmentModule),
    ],
    controllers: [
        VaccineReservationController
    ],
    providers: [
        VaccineReservationServices,
        VaccinereservationRepository
    ],
    exports: [
        VaccineReservationServices
    ]
})
export class VaccineReservationModule {}