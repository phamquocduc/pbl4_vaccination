import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccineReservation } from "./vaccine-reservation.entity";
import { VaccineReservationController } from "./vaccine-reservation.controller";
import { VaccineReservationServices } from "./vaccine-reservation.services";
import { VaccinereservationRepository } from "./vaccine-reservation.repository";

@Module({
    imports:[TypeOrmModule.forFeature([VaccineReservation])],
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