import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VaccineInventory } from "./vaccine-inventory.entity";
import { VaccinationCenter } from "src/vaccination-center/vaccination-center.entity";
import { VaccineInventoryUpdateDto } from "./dto/vaccine-inventory-update.dto";
import { CustomAppException } from "src/exceptions/custom-app.exceptions";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";

@Injectable()
export class VaccineinventoryRepository{
    constructor(
        @InjectRepository(VaccineInventory)
        private vaccineinventoryRepository: Repository<VaccineInventory>
    ){}

    async findAll(): Promise<VaccineInventory[] | null>{
        return await this.vaccineinventoryRepository.find()
    }

    async create(center: VaccinationCenter): Promise<VaccineInventory>{
        const inventory = {
            name: 'Kho ' + center.name,
            capacity: 10000
        }
        const newVaccineInventory = this.vaccineinventoryRepository.create({
            ...inventory,
            vaccinationCenter: center
        })

        return await this.vaccineinventoryRepository.save(newVaccineInventory)
    }

    async updatById(inventoryId: number, updateDto: VaccineInventoryUpdateDto): Promise<VaccineInventory>{
       
        const vaccineInventory = await this.vaccineinventoryRepository.findOne({
            where: { id : inventoryId}
        })

        if(!vaccineInventory)
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.VACCINE_INVENTORY_NOT_EXIT), HttpStatus.BAD_REQUEST)

        Object.assign(vaccineInventory, updateDto)

        return await this.vaccineinventoryRepository.save(vaccineInventory)
    }

}