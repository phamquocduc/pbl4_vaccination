import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vaccine } from "./vaccine.entity";
import { VaccineController } from "./vaccine.controller";
import { VaccineServices } from "./vaccine.services";
import { VaccineRepository } from "./vaccine.repository";
import { VaccineDescriptionModule } from "src/vaccine-descrpition/vaccine-descrpition.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([Vaccine]),
        forwardRef(() => VaccineDescriptionModule)
    ],
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