import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccineDescription } from "./vaccine-descrpition.entity";
import { VaccinedescrpitionController } from "./vaccine-descrpition.controller";
import { VaccinedescrpitionServices } from "./vaccine-descrpition.services";
import { VaccinedescrpitionRepository } from "./vaccine-descrpition.repository";
import { VaccineModule } from "src/vaccine/vaccine.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([VaccineDescription]),
        forwardRef(() => VaccineModule)
    ],
    controllers: [
        VaccinedescrpitionController
    ],
    providers: [
        VaccinedescrpitionServices,
        VaccinedescrpitionRepository
    ],
    exports: [
        VaccinedescrpitionServices
    ]
})
export class VaccineDescriptionModule {}