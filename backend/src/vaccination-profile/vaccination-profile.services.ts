import { HttpStatus, Injectable } from "@nestjs/common";
import { VaccinationprofileRepository } from "./vaccination-profile.repository";
import { VaccinationProfileCreateDto } from "./dto/vaccination-profile-create.dto";
import { VaccinationProfile } from "./vaccination-profile.entity";
import { User } from "src/user/user.entity";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";
import { CustomAppException } from "src/exceptions/custom-app.exceptions";
import { log } from "console";
import { UpdateVaccinationProfileDto } from "./dto/vaccination-profile-update.dto";

@Injectable()
export class VaccinationprofileServices{
    constructor(
        private vaccinationprofileRepository: VaccinationprofileRepository
    ){}

    async create(createDto : VaccinationProfileCreateDto, user: User) : Promise<VaccinationProfile>{

        if(user.vaccinationProfiles.length >= 5)
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.EXCEED_THE_LIMIT), HttpStatus.BAD_REQUEST)
        
        return await this.vaccinationprofileRepository.create(createDto, user)
    }

    async updateProfileById(id: number, updateDto : UpdateVaccinationProfileDto) : Promise<VaccinationProfile>{
        
        return await this.vaccinationprofileRepository.updateProfileById(id, updateDto)
    }
    
    async getAllProfileByUserid(userId: string): Promise<VaccinationProfile[]>{
        return this.vaccinationprofileRepository.getAllProfileById(userId)
    }

    // async findOneByEmail(email: string): Promise<User>{
    //     return await this.userRepository.findOneByEmail(email)
    // }

    // async findById(id: string): Promise<User>{
    //     return await this.userRepository.findById(id)
    // }
}
