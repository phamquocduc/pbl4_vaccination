import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccineInventory } from "./vaccine-inventory.entity";
import { VaccineInventoryController } from "./vaccine-inventory.controller";
import { VaccineInventoryServices } from "./vaccine-inventory.services";
import { VaccineinventoryRepository } from "./vaccine-inventory.repository";
import { VaccinationCenterModule } from "src/vaccination-center/vaccination-center.module";
import { VaccineModule } from "src/vaccine/vaccine.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([VaccineInventory]),
        forwardRef(() => VaccinationCenterModule),
        forwardRef(() => VaccineModule),
    ],
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