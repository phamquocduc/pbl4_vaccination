import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VaccineInventory } from "./vaccine-inventory.entity";

@Injectable()
export class VaccineinventoryRepository{
    constructor(
        @InjectRepository(VaccineInventory)
        private vaccineinventoryRepository: Repository<VaccineInventory>
    ){}

}