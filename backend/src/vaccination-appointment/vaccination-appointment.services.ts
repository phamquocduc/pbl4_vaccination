import { Injectable } from "@nestjs/common";
import { VaccinationAppointmentRepository } from "./vaccination-appointment.repository";
import { VaccineReservation } from "src/vaccine-reservation/vaccine-reservation.entity";
import { VaccineServices } from "src/vaccine/vaccine.services";
import { VaccineAppointmentUpdateDto } from "./dto/vaccine-appointment-update.dto";
import { VaccinationAppointment } from "./vaccination-appointment.entity";

@Injectable()
export class VaccinationAppointmentServices{
    constructor(
        private vaccinationAppointmentRepository: VaccinationAppointmentRepository,
    ){}

    async create(vaccineReservation: VaccineReservation){

        const numberOfAppointment = vaccineReservation.vaccine.doseNumber
        const durationIntervals = vaccineReservation.vaccine.durationIntervals


        console.log(numberOfAppointment)

        return await this.vaccinationAppointmentRepository.create(durationIntervals, numberOfAppointment, vaccineReservation)
    }

    async update(id: number, appointmentUpdateDto: VaccineAppointmentUpdateDto): Promise<VaccinationAppointment>{
        return await this.vaccinationAppointmentRepository.updateById(id, appointmentUpdateDto)
    }
}
