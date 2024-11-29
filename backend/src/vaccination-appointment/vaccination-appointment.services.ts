import { Injectable } from "@nestjs/common";
import { VaccinationAppointmentRepository } from "./vaccination-appointment.repository";
import { VaccineReservation } from "src/vaccine-reservation/vaccine-reservation.entity";

@Injectable()
export class VaccinationAppointmentServices{
    constructor(
        private vaccinationAppointmentRepository: VaccinationAppointmentRepository
    ){}

    async create(vaccineReservation: VaccineReservation){

        return await this.vaccinationAppointmentRepository.create(vaccineReservation)
    }
}
