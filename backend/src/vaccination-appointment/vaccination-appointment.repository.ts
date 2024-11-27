import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VaccinationAppointment } from "./vaccination-appointment.entity";
import { VaccineReservation } from "src/vaccine-reservation/vaccine-reservation.entity";

@Injectable()
export class VaccinationAppointmentRepository{
    constructor(
        @InjectRepository(VaccinationAppointment)
        private VaccinationAppointmentRepository: Repository<VaccinationAppointment>
    ){}

    async create(vaccineReservation: VaccineReservation){
        const appointment = this.VaccinationAppointmentRepository.create({
            reservation: {id: vaccineReservation.id}
        })

        return await this.VaccinationAppointmentRepository.save(appointment)
    }
    
}