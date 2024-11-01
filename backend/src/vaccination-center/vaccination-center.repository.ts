import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VaccinationCenter } from "./vaccination-center.entity";
import { VaccinationCenterCreateDto } from "./dto/vaccination-center-create.dto";
import { VaccinationCenterUpdateDto } from "./dto/vaccination-center-update.dto";
import { CustomAppException } from "src/exceptions/custom-app.exceptions";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";
import { log } from "console";

@Injectable()
export class VaccinationcenterRepository{
    constructor(
        @InjectRepository(VaccinationCenter)
        private vaccinationcenterRepository: Repository<VaccinationCenter>
    ){}

    async findAll(): Promise<VaccinationCenter[] | null>{
        const centers = await this.vaccinationcenterRepository
                                    .createQueryBuilder('vaccinnationCenter')
                                    .where('vaccinnationCenter.isDeleted = :isDeleted', { isDeleted: false})
                                    .getMany()

        return centers
    }

    async findById(id: number): Promise<VaccinationCenter | null>{
        const center = await this.vaccinationcenterRepository
                                        .createQueryBuilder('vaccinnationCenter')
                                        .where('vaccinnationCenter.id = :id', { id: id})
                                        .andWhere('vaccinnationCenter.isDeleted = :isDeleted', { isDeleted: false})
                                        .getOne()

        return center
    }


    async create(createDto: VaccinationCenterCreateDto): Promise<VaccinationCenter>{
        const newCenter = this.vaccinationcenterRepository.create(createDto)

        return await this.vaccinationcenterRepository.save(newCenter)
    }

    async deleteById(id: number): Promise<VaccinationCenter>{
        const vaccinationCenter = await this.vaccinationcenterRepository.findOne({
            where: {id: id}
        })

        if(!vaccinationCenter)
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.VACCINATION_CENTER_NOT_EXIT), HttpStatus.BAD_REQUEST)

        Object.assign(vaccinationCenter, { isDeleted: true})

        return await this.vaccinationcenterRepository.save(vaccinationCenter)
    }

    async updateById(updateDto: VaccinationCenterUpdateDto, id: number): Promise<VaccinationCenter>{
        const currentCenter = await this.vaccinationcenterRepository.findOne({
            where: {id: id}
        })

        if(!currentCenter)
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.VACCINATION_CENTER_NOT_EXIT), HttpStatus.BAD_REQUEST)

        Object.assign(currentCenter, updateDto)

        return await this.vaccinationcenterRepository.save(currentCenter)
    }
}