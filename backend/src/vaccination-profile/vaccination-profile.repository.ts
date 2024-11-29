import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VaccinationProfile } from "./vaccination-profile.entity";
import { VaccinationProfileCreateDto } from "./dto/vaccination-profile-create.dto";
import { User } from "src/user/user.entity";
import { UpdateVaccinationProfileDto } from "./dto/vaccination-profile-update.dto";
import { CustomAppException } from "src/exceptions/custom-app.exceptions";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";
import { log } from "console";

@Injectable()
export class VaccinationprofileRepository{
    constructor(
        @InjectRepository(VaccinationProfile)
        private VaccinationprofileRepository: Repository<VaccinationProfile>
    ){}

    async create(createDto : VaccinationProfileCreateDto, user: User) : Promise<VaccinationProfile | null>{
        const newVaccinationProfile = this.VaccinationprofileRepository.create({
            ...createDto,
            user: {id: user.id}
        })

        return await this.VaccinationprofileRepository.save(newVaccinationProfile)
    }

    async getAllProfileById(id: string): Promise<VaccinationProfile[]>{

        const profiles = await this.VaccinationprofileRepository
                                    .createQueryBuilder('profiles')
                                    .where('profiles.user.id = :id', { id: id })
                                    .andWhere('profiles.isDeleted = :value', { value: false })
                                    .getMany()

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

    async deleteProfileByid(id: number): Promise<any>{

      const profile = await this.VaccinationprofileRepository.findOne(
        {
          where: { id : id}
        }
      )

      if(!profile)
        throw new CustomAppException(createExceptionMessage(ExceptionEnum.PROFILE_NOT_EXIT), HttpStatus.BAD_REQUEST)

      Object.assign(profile, { isDeleted: true})

      await this.VaccinationprofileRepository.save(profile)

      return {
        message: 'Delete suscessfully'
      }
    }

    async findAllProfile(): Promise<VaccinationProfile[] | null>{
      return await this.VaccinationprofileRepository.find()
    }
}