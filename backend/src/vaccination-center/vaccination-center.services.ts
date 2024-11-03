import { Injectable } from "@nestjs/common";
import { VaccinationcenterRepository } from "./vaccination-center.repository";
import { VaccinationCenterCreateDto } from "./dto/vaccination-center-create.dto";
import { VaccinationCenterUpdateDto } from "./dto/vaccination-center-update.dto";
import { VaccinationCenter } from "./vaccination-center.entity";
import { VaccineInventoryServices } from "src/vaccine-inventory/vaccine-inventory.services";

@Injectable()
export class VaccinationcenterServices{
    constructor(
        private vaccinationcenterRepository: VaccinationcenterRepository,
        private vaccineInventoryServices: VaccineInventoryServices,
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

        const center = await this.vaccinationcenterRepository.create(createDto)

        await this.vaccineInventoryServices.create(center)

        return center
    }

    async deleteVaccinationCenterById(id: number): Promise<VaccinationCenter>{

        return await this.vaccinationcenterRepository.deleteById(id)
    }

    async updateVaccinationCenterById(updateDto: VaccinationCenterUpdateDto, id: number): Promise<VaccinationCenter>{
        
        return await this.vaccinationcenterRepository.updateById(updateDto, id)
    }
}
