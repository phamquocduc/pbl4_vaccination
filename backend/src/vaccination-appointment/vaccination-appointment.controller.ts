import { Controller } from "@nestjs/common";
import { VaccinationAppointmentServices } from "./vaccination-appointment.services";

@Controller('user')
export class VaccinationAppointmentController{
    constructor(
        private readonly vaccinationAppointmentSevices: VaccinationAppointmentServices
    ){}

    
}