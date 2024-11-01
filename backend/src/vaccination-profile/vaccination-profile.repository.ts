import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VaccinationProfile } from "./vaccination-profile.entity";
import { VaccinationProfileCreateDto } from "./dto/vaccination-profile-create.dto";
import { User } from "src/user/user.entity";
import { UpdateVaccinationProfileDto } from "./dto/vaccination-profile-update.dto";
import { CustomAppException } from "src/exceptions/custom-app.exceptions";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";

@Injectable()
export class VaccinationprofileRepository{
    constructor(
        @InjectRepository(VaccinationProfile)
        private VaccinationprofileRepository: Repository<VaccinationProfile>
    ){}

    async create(createDto : VaccinationProfileCreateDto, user: User) : Promise<VaccinationProfile | null>{
        const newVaccinationProfile = this.VaccinationprofileRepository.create({
            ...createDto,
            user: user
        })

        return await this.VaccinationprofileRepository.save(newVaccinationProfile)
    }

    async getAllProfileById(id: string): Promise<VaccinationProfile[]>{

        const profiles = await this.VaccinationprofileRepository.find({
          where: { 
            user: {id: id}
          }
        });

        return profiles
    }

    async updateProfileById(id: number, updateDto: UpdateVaccinationProfileDto): Promise<VaccinationProfile>{

        const profiles = await this.VaccinationprofileRepository.findOne({
          where: { 
            id: id
          }
        });

        if(!profiles)
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.PROFILE_NOT_EXIT), HttpStatus.BAD_REQUEST)

        Object.assign(profiles, updateDto)

        this.VaccinationprofileRepository.save(profiles)

        return profiles
    }

    // async findOneByEmail(email: string): Promise<User | null>{

    //     const user = await this.userRepository.findOne({where: {email}})
    //     if(!user) throw new CustomAppException(ExceptionEnum.USER_NOT_EXIT, HttpStatus.BAD_REQUEST)

    //     return user
    // }

    // async findById(id: string): Promise<User | null>{

    //     const user  = await this.userRepository.findOneBy({id})
    //     if(!user) throw new CustomAppException(ExceptionEnum.USER_NOT_EXIT, HttpStatus.BAD_REQUEST)

    //     return user
    // }
}