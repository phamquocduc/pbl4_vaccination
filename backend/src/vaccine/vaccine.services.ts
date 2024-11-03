import { Injectable } from "@nestjs/common";
import { VaccineRepository } from "./vaccine.repository";
import { VaccineCreateDto } from "./dto/vaccinae-create.dto";
import { Vaccine } from "./vaccine.entity";
import { VaccinedescrpitionServices } from "src/vaccine-descrpition/vaccine-descrpition.services";
import { VaccineDescriptionUpdateDto } from "src/vaccine-descrpition/dto/vaccine-description-update.dto";
import { VaccineDescription } from "src/vaccine-descrpition/vaccine-descrpition.entity";
import { VaccineUpdateDto } from "./dto/vaccine-update.dto";
import { VaccineInventoryServices } from "src/vaccine-inventory/vaccine-inventory.services";

@Injectable()
export class VaccineServices{
    constructor(
        private vaccineRepository: VaccineRepository,
        private vaccineDesciptionServices: VaccinedescrpitionServices,
        private vaccineInventoryServices: VaccineInventoryServices,
    ){}

    async getAllVaccine(): Promise<Vaccine[] | null>{
        return this.vaccineRepository.findAll()
    }

    async getOneById(id: number): Promise<Vaccine | null>{
        return this.vaccineRepository.findOneById(id)
    }

    async createVaccin(createDto: VaccineCreateDto): Promise<Vaccine>{
        const vaccineDescription = await this.vaccineDesciptionServices.create()

        const inventorys = await this.vaccineInventoryServices.getAllInventory()

        return await this.vaccineRepository.create(createDto, vaccineDescription, inventorys)
    }

    async updateVaccine(id: number, updateDto: VaccineUpdateDto): Promise<Vaccine>{

        return await this.vaccineRepository.update(id, updateDto)
    }

    async updateVaccineDescription(id: number, updateDto: VaccineDescriptionUpdateDto): Promise<VaccineDescription>{

        const vaccineDescriptionId = await this.vaccineRepository.getVaccineDescriptionId(id)

        return await this.vaccineDesciptionServices.update(vaccineDescriptionId, updateDto)
    }

    async deleteVaccine(id: number): Promise<any>{

        const descriptionId = await this.vaccineRepository.getVaccineDescriptionId(id)
        
        const result = await this.vaccineRepository.delete(id)
        
        this.vaccineDesciptionServices.delete(descriptionId)

        return result
    }
}
