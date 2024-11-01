import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccinationCenter } from "./vaccination-center.entity";
import { VaccinationcenterController } from "./vaccination-center.controller";
import { VaccinationcenterRepository } from "./vaccination-center.repository";
import { VaccinationcenterServices } from "./vaccination-center.services";

@Module({
    imports:[TypeOrmModule.forFeature([VaccinationCenter])],
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