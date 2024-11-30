import { HttpStatus, Injectable } from '@nestjs/common';
import { VaccinationprofileRepository } from './vaccination-profile.repository';
import { VaccinationProfileCreateDto } from './dto/vaccination-profile-create.dto';
import { VaccinationProfile } from './vaccination-profile.entity';
import { User } from 'src/user/user.entity';
import {
    createExceptionMessage,
    ExceptionEnum,
} from 'src/enums/exception.enum';
import { CustomAppException } from 'src/exceptions/custom-app.exceptions';
import { log } from 'console';
import { UpdateVaccinationProfileDto } from './dto/vaccination-profile-update.dto';

@Injectable()
export class VaccinationprofileServices {
    constructor(
        private vaccinationprofileRepository: VaccinationprofileRepository
    ) {}

    async create(
        createDto: VaccinationProfileCreateDto,
        user: User
    ): Promise<VaccinationProfile> {
        if (user.vaccinationProfiles.length >= 1)
            throw new CustomAppException(
                createExceptionMessage(ExceptionEnum.EXCEED_THE_LIMIT),
                HttpStatus.BAD_REQUEST
            );

        return await this.vaccinationprofileRepository.create(createDto, user);
    }

    async updateProfileById(
        id: number,
        updateDto: UpdateVaccinationProfileDto
    ): Promise<VaccinationProfile> {
        return await this.vaccinationprofileRepository.updateProfileById(
            id,
            updateDto
        );
    }

    async getAllProfileByUserid(userId: string): Promise<VaccinationProfile[]> {
        return await this.vaccinationprofileRepository.getAllProfileById(
            userId
        );
    }

    async deleteProfileById(id: number): Promise<any> {
        return await this.vaccinationprofileRepository.deleteProfileByid(id);
    }

    async getAllProfile(): Promise<VaccinationProfile[] | null> {
        return await this.vaccinationprofileRepository.findAllProfile();
    }
}
