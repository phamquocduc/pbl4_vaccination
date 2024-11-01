import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccineInventory } from "./vaccine-inventory.entity";
import { VaccineInventoryController } from "./vaccine-inventory.controller";
import { VaccineInventoryServices } from "./vaccine-inventory.services";
import { VaccineinventoryRepository } from "./vaccine-inventory.repository";

@Module({
    imports:[TypeOrmModule.forFeature([VaccineInventory])],
    controllers: [
        VaccineInventoryController
    ],
    providers: [
        VaccineInventoryServices,
        VaccineinventoryRepository
    ],
    exports: [
        VaccineInventoryServices
    ]
})
export class VaccineInventoryModule {}