import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccinationAppointment } from "./vaccination-appointment.entity";
import { VaccinationAppointmentController } from "./vaccination-appointment.controller";
import { VaccinationAppointmentServices } from "./vaccination-appointment.services";
import { VaccinationAppointmentRepository } from "./vaccination-appointment.repository";
import { PaymentModule } from "src/payment/payment.module";
import { VaccineReservationModule } from "src/vaccine-reservation/vaccine-reservation.module";
import { VaccineModule } from "src/vaccine/vaccine.module";
import { UserModule } from "src/user/user.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([VaccinationAppointment]),
        forwardRef(() => PaymentModule),
        forwardRef(() => VaccineModule),
        forwardRef(() => UserModule),
    ],
    controllers: [VaccinationAppointmentController],
    providers: [
        VaccinationAppointmentServices,
        VaccinationAppointmentRepository
    ],
    exports: [VaccinationAppointmentServices]
})
export class VaccinationAppointmentModule {}