import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VaccineDescription } from "./vaccine-descrpition.entity";
import { CustomAppException } from "src/exceptions/custom-app.exceptions";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";
import { VaccineDescriptionUpdateDto } from "./dto/vaccine-description-update.dto";

@Injectable()
export class VaccinedescrpitionRepository{
    constructor(
        @InjectRepository(VaccineDescription)
        private vaccinedescrpitionRepository: Repository<VaccineDescription>
    ){}

    // async findAll(): Promise<VaccinationCenter[] | null>{
    //     const centers = await this.vaccinationcenterRepository
    //                                 .createQueryBuilder('vaccinnationCenter')
    //                                 .where('vaccinnationCenter.isDeleted = :isDeleted', { isDeleted: false})
    //                                 .getMany()

    //     return centers
    // }

    // async findById(id: number): Promise<VaccinationCenter | null>{
    //     const center = await this.vaccinationcenterRepository
    //                                     .createQueryBuilder('vaccinnationCenter')
    //                                     .where('vaccinnationCenter.id = :id', { id: id})
    //                                     .andWhere('vaccinnationCenter.isDeleted = :isDeleted', { isDeleted: false})
    //                                     .getOne()

    //     return center
    // }


    async create(): Promise<VaccineDescription>{
        const newVaccineDescription = this.vaccinedescrpitionRepository.create()

        return await this.vaccinedescrpitionRepository.save(newVaccineDescription)
    }

    async update(id: number, updateDto: VaccineDescriptionUpdateDto): Promise<VaccineDescription>{
        const vaccineDescription = await this.vaccinedescrpitionRepository.findOne({
            where: { id: id }
        })

        if(!vaccineDescription)
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.VACCINE_DESCRIPTION_NOT_EXIT), HttpStatus.BAD_REQUEST)

        Object.assign(vaccineDescription, updateDto)
        
        return await this.vaccinedescrpitionRepository.save(vaccineDescription)
    }

    async delete(id: number){
        await this.vaccinedescrpitionRepository.delete(id)
    }

    // async deleteById(id: number): Promise<VaccinationCenter>{
    //     const vaccinationCenter = await this.vaccinationcenterRepository.findOne({
    //         where: {id: id}
    //     })

    //     if(!vaccinationCenter)
    //         throw new CustomAppException(createExceptionMessage(ExceptionEnum.VACCINATION_CENTER_NOT_EXIT), HttpStatus.BAD_REQUEST)

    //     Object.assign(vaccinationCenter, { isDeleted: true})

    //     return await this.vaccinationcenterRepository.save(vaccinationCenter)
    // }

    // async updateById(updateDto: VaccinationCenterUpdateDto, id: number): Promise<VaccinationCenter>{
    //     const currentCenter = await this.vaccinationcenterRepository.findOne({
    //         where: {id: id}
    //     })

    //     if(!currentCenter)
    //         throw new CustomAppException(createExceptionMessage(ExceptionEnum.VACCINATION_CENTER_NOT_EXIT), HttpStatus.BAD_REQUEST)

    //     Object.assign(currentCenter, updateDto)

    //     return await this.vaccinationcenterRepository.save(currentCenter)
    // }
}