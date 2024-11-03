import { Injectable } from "@nestjs/common";
import { VaccinationAppointmentRepository } from "./vaccination-appointment.repository";

@Injectable()
export class VaccinationAppointmentServices{
    constructor(
        private vaccinationAppointmentRepository: VaccinationAppointmentRepository
    ){}

    
}
