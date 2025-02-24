import { Injectable } from "@nestjs/common";
import { VaccineinventoryRepository } from "./vaccine-inventory.repository";
import { VaccineInventory } from "./vaccine-inventory.entity";
import { VaccinationCenter } from "src/vaccination-center/vaccination-center.entity";
import { VaccineInventoryUpdateDto } from "./dto/vaccine-inventory-update.dto";

@Injectable()
export class VaccineInventoryServices{
    constructor(
        private vaccineInventoryRepository: VaccineinventoryRepository
    ){}

    async getAllInventory(): Promise<VaccineInventory[]>{
        return await this.vaccineInventoryRepository.findAll()
    }

    async create(center: VaccinationCenter): Promise<VaccineInventory>{

        return await this.vaccineInventoryRepository.create(center)
    }

    async updateById(id: number, updateDto: VaccineInventoryUpdateDto): Promise<VaccineInventory>{
        return await this.vaccineInventoryRepository.updatById(id, updateDto)
    }
}
