import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UploadedFiles,
    UseFilters,
    UseInterceptors,
} from '@nestjs/common';
import { UserServices } from './user.services';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './user.entity';
import { DuplicatePropertiesFilter } from 'src/filters/dulicate-properties.filters';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserUpdateDto } from './dto/user-update.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { VaccinationprofileServices } from 'src/vaccination-profile/vaccination-profile.services';
import { UpdateVaccinationProfileDto } from 'src/vaccination-profile/dto/vaccination-profile-update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { log } from 'console';
import { VaccinationProfileCreateDto } from 'src/vaccination-profile/dto/vaccination-profile-create.dto';
import { VaccinationProfile } from 'src/vaccination-profile/vaccination-profile.entity';
import { Roles } from 'src/auth/decorators/role.decorator';
import { ERole } from 'src/enums/role.enum';
import { VaccineReservationCreateDto } from 'src/vaccine-reservation/dto/vaccine-reservation-create.dto';
import { VaccineReservation } from 'src/vaccine-reservation/vaccine-reservation.entity';
import { VaccineReservationServices } from 'src/vaccine-reservation/vaccine-reservation.services';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userSevices: UserServices,
        private readonly vaccinationProfileSevices: VaccinationprofileServices,
        private readonly vaccineReservationSevices: VaccineReservationServices,
        private readonly cloudinarySevices: CloudinaryService
    ) {}

    @Get()
    async getProfile(@Request() req: any) {
        const id = req['user'].sub;
        return this.userSevices.findById(id);
    }

    @Get('vaccination-profiles')
    async getAllVaccinationProfile(@Request() req: any) {
        const id = req['user'].sub;
        return await this.vaccinationProfileSevices.getAllProfileByUserid(id);
    }

    @Public()
    @Post()
    @UseFilters(DuplicatePropertiesFilter)
    async create(@Body() createUserRequest: UserCreateDto): Promise<User> {
        return this.userSevices.create(createUserRequest);
    }

    @Put('update')
    @UseFilters(DuplicatePropertiesFilter)
    async update(
        @Body() updateUserRequest: UserUpdateDto,
        @Request() req: any
    ): Promise<User> {
        const userId = req['user'].sub;
        return this.userSevices.update(updateUserRequest, userId);
    }

    @Put('update/avatar')
    @UseInterceptors(FilesInterceptor('file', 1))
    async updateAvatar(
        @UploadedFiles() file: Express.Multer.File[],
        @Request() req: any
    ): Promise<User> {
        const userId = req['user'].sub;
        console.log(file);
        if (file) {
            const uploadPromises = file.map((file) =>
                this.cloudinarySevices.uploadFile(file)
            );
            const uploadResults = await Promise.all(uploadPromises);

            console.log(uploadResults);
            await this.userSevices.updateAvatar(
                uploadResults[0].secure_url,
                userId
            );
        }

        return this.userSevices.findById(userId);
    }

    @Put('change-password')
    async changePassword(
        @Body() changePasswordDto: ChangePasswordDto,
        @Request() req: any
    ): Promise<User> {
        const userId = req['user'].sub;
        return this.userSevices.changePassword(changePasswordDto, userId);
    }

    @Post('create-vaccination-profile')
    @UseFilters(DuplicatePropertiesFilter)
    async createProfile(
        @Body() createProfileRequest: VaccinationProfileCreateDto,
        @Request() req: any
    ): Promise<VaccinationProfile> {
        const user = await this.userSevices.findById(req['user'].sub);

        return this.vaccinationProfileSevices.create(
            createProfileRequest,
            user
        );
    }

    @Post('create-vaccine-reservation')
    async createVaccineReservation(
        @Body() createDto: VaccineReservationCreateDto,
        @Request() req: any
    ): Promise<VaccineReservation> {
        const user = await this.userSevices.findById(req['user'].sub);

        return this.vaccineReservationSevices.create(user.id, createDto);
    }

    @Get('get-vaccine-reservations')
    async getAllVaccineReservation(
        @Request() req: any
    ): Promise<VaccineReservation[]> {
        const user = await this.userSevices.findById(req['user'].sub);

        return this.vaccineReservationSevices.getAllByUserId(user.id);
    }

    @Put('update-vaccination-profile/:id')
    async updateProfileById(
        @Body() updateProfileDto: UpdateVaccinationProfileDto,
        @Param('id') id: string,
        @Request() req: any
    ): Promise<any> {
        const userId = req['user'].sub;
        return this.userSevices.updateProfileById(
            userId,
            Number.parseInt(id),
            updateProfileDto
        );
    }

    @Delete('delete-vaccination-profile/:id')
    async deleteProfileById(
        @Param('id') id: string,
        @Request() req: any
    ): Promise<any> {
        const userId = req['user'].sub;
        return this.userSevices.deleteProfileById(userId, Number.parseInt(id));
    }
}
