import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VaccinationAppointment } from "./vaccination-appointment.entity";

@Injectable()
export class VaccinationAppointmentRepository{
    constructor(
        @InjectRepository(VaccinationAppointment)
        private VaccinationAppointmentRepository: Repository<VaccinationAppointment>
    ){}

    
}