import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { UserServices } from "../user.services";
import { Roles } from "src/auth/decorators/role.decorator";
import { ERole } from "src/enums/role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { VaccinationAppointmentServices } from "src/vaccination-appointment/vaccination-appointment.services";
import { VaccineAppointmentUpdateDto } from "src/vaccination-appointment/dto/vaccine-appointment-update.dto";
import { VaccinationprofileServices } from "src/vaccination-profile/vaccination-profile.services";
import { VaccineReservationServices } from "src/vaccine-reservation/vaccine-reservation.services";

@ApiBearerAuth()
@ApiTags('admin')
@Roles(ERole.ADMIN)
@Controller('admin')
export class AdminController{
    constructor(
        private readonly userServices: UserServices,
        private readonly vaccinationAppointmentServices: VaccinationAppointmentServices,
        private readonly vaccinationProfileServices: VaccinationprofileServices,
        private readonly vaccinationReservationServices: VaccineReservationServices,
    ){}

    @Get('users')
    async getAllUser(){
        return this.userServices.findAll()
    }

    @Get('profiles')
    async getAllProfile(){
        return this.vaccinationProfileServices.getAllProfile()
    }

    @Get('reservation')
    async getReservationByEmail(@Query('email') email: string){
        return this.vaccinationReservationServices.getAllByEmail(email)
    }

    @Put('update/appointment/:id')
    async updateAppointment(@Param('id') id: string, @Body() updateDto: VaccineAppointmentUpdateDto){
        return this.vaccinationAppointmentServices.update(Number.parseInt(id), updateDto)
    }
}