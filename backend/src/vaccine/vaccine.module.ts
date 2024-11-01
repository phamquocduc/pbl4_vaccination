import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vaccine } from "./vaccine.entity";
import { VaccineController } from "./vaccine.controller";
import { VaccineServices } from "./vaccine.services";
import { VaccineRepository } from "./vaccine.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Vaccine])],
    controllers: [
        VaccineController
    ],
    providers: [
        VaccineServices,
        VaccineRepository
    ],
    exports: [
        VaccineServices
    ]
})
export class VaccineModule {}