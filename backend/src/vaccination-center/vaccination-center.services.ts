import { Injectable } from "@nestjs/common";
import { VaccinationcenterRepository } from "./vaccination-center.repository";
import { VaccinationCenterCreateDto } from "./dto/vaccination-center-create.dto";
import { VaccinationCenterUpdateDto } from "./dto/vaccination-center-update.dto";
import { VaccinationCenter } from "./vaccination-center.entity";

@Injectable()
export class VaccinationcenterServices{
    constructor(
        private vaccinationcenterRepository: VaccinationcenterRepository
    ){}

    async getAll(): Promise<VaccinationCenter[] | null>{
        const centers = await this.vaccinationcenterRepository.findAll()

        return centers
    }

    async getById(id: number): Promise<VaccinationCenter | null>{
        const center = await this.vaccinationcenterRepository.findById(id)

        return center
    }


    async createVaccinationCenter(createDto: VaccinationCenterCreateDto): Promise<VaccinationCenter>{

        return await this.vaccinationcenterRepository.create(createDto)
    }

    async deleteVaccinationCenterById(id: number): Promise<VaccinationCenter>{

        return await this.vaccinationcenterRepository.deleteById(id)
    }

    async updateVaccinationCenterById(updateDto: VaccinationCenterUpdateDto, id: number): Promise<VaccinationCenter>{
        
        return await this.vaccinationcenterRepository.updateById(updateDto, id)
    }
}
