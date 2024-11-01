import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccinationAppointment } from "./vaccination-appointment.entity";
import { VaccinationAppointmentController } from "./vaccination-appointment.controller";
import { VaccinationAppointmentServices } from "./vaccination-appointment.services";
import { VaccinationAppointmentRepository } from "./vaccination-appointment.repository";

@Module({
    imports:[TypeOrmModule.forFeature([VaccinationAppointment])],
    controllers: [VaccinationAppointmentController],
    providers: [
        VaccinationAppointmentServices,
        VaccinationAppointmentRepository
    ],
    exports: [VaccinationAppointmentServices]
})
export class VaccinationAppointmentModule {}