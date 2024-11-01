import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccineDescription } from "./vaccine-descrpition.entity";
import { VaccinedescrpitionController } from "./vaccine-descrpition.controller";
import { VaccinedescrpitionServices } from "./vaccine-descrpition.services";
import { VaccinedescrpitionRepository } from "./vaccine-descrpition.repository";

@Module({
    imports:[TypeOrmModule.forFeature([VaccineDescription])],
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