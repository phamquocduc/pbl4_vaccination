import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseFilters,
} from '@nestjs/common';
import { UserServices } from '../user.services';
import { Roles } from 'src/auth/decorators/role.decorator';
import { ERole } from 'src/enums/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VaccinationAppointmentServices } from 'src/vaccination-appointment/vaccination-appointment.services';
import { VaccineAppointmentUpdateDto } from 'src/vaccination-appointment/dto/vaccine-appointment-update.dto';
import { VaccinationprofileServices } from 'src/vaccination-profile/vaccination-profile.services';
import { VaccineReservationServices } from 'src/vaccine-reservation/vaccine-reservation.services';
import { VaccinationProfileCreateDto } from 'src/vaccination-profile/dto/vaccination-profile-create.dto';
import { DuplicatePropertiesFilter } from 'src/filters/dulicate-properties.filters';
import { UserRepository } from '../user.repository';
import { UserCreateDto } from '../dto/user-create.dto';

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin')
export class AdminController {
    constructor(
        private readonly userServices: UserServices,
        private readonly vaccinationAppointmentServices: VaccinationAppointmentServices,
        private readonly vaccinationProfileServices: VaccinationprofileServices,
        private readonly vaccinationReservationServices: VaccineReservationServices,
        private readonly userRepository: UserRepository
    ) {}

    @Get('users')
    @Roles([ERole.ADMIN, ERole.STAFF])
    async getAllUser() {
        return this.userServices.findAll();
    }

    @Get('staffs')
    @Roles([ERole.ADMIN, ERole.STAFF])
    async getAllStaff() {
        return this.userServices.findAllStaff();
    }

    @Get('profiles')
    @Roles([ERole.ADMIN, ERole.STAFF])
    async getAllProfile() {
        return this.vaccinationProfileServices.getAllProfile();
    }

    @Post('create/profile')
    @UseFilters(DuplicatePropertiesFilter)
    @Roles([ERole.ADMIN, ERole.STAFF])
    async adminCreateProfile(
        @Body() profileCreateDto: VaccinationProfileCreateDto
    ) {
        return this.vaccinationProfileServices.createProfile(profileCreateDto);
    }

    @Post('create/staff')
    @UseFilters(DuplicatePropertiesFilter)
    @Roles([ERole.ADMIN])
    async adminCreateStaff(@Body() userCreateDto: UserCreateDto) {
        return await this.userRepository.create(userCreateDto);
    }

    @Get('reservation')
    @Roles([ERole.ADMIN, ERole.STAFF])
    async getReservationByEmail(@Query('email') email: string) {
        return this.vaccinationReservationServices.getAllByEmail(email);
    }

    @Get('appointment')
    @Roles([ERole.ADMIN, ERole.STAFF])
    async getAppointmentByEmail(@Query('email') email: string) {
        return this.vaccinationAppointmentServices.getAppointmentByEmail(email);
    }

    @Put('update/appointment/:id')
    @Roles([ERole.ADMIN, ERole.STAFF])
    async updateAppointment(
        @Param('id') id: string,
        @Body() updateDto: VaccineAppointmentUpdateDto
    ) {
        return this.vaccinationAppointmentServices.update(
            Number.parseInt(id),
            updateDto
        );
    }
}
