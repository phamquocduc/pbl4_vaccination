import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccinationCenter } from "./vaccination-center.entity";
import { VaccinationcenterController } from "./vaccination-center.controller";
import { VaccinationcenterRepository } from "./vaccination-center.repository";
import { VaccinationcenterServices } from "./vaccination-center.services";
import { VaccineInventoryModule } from "src/vaccine-inventory/vaccine-inventory.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([VaccinationCenter]),
        forwardRef(() => VaccineInventoryModule)
    ],
    controllers: [
        VaccinationcenterController
    ],
    providers: [
        VaccinationcenterRepository,
        VaccinationcenterServices
    ],
    exports: [
        VaccinationcenterServices
    ]
})
export class VaccinationCenterModule {}