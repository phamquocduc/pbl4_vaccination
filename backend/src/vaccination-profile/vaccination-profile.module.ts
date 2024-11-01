import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccinationProfile } from "./vaccination-profile.entity";
import { VaccinationprofileController } from "./vaccination-profile.controller";
import { VaccinationprofileServices } from "./vaccination-profile.services";
import { VaccinationprofileRepository } from "./vaccination-profile.repository";
import { UserModule } from "src/user/user.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([VaccinationProfile]),
        forwardRef(() => UserModule)
    ],
    controllers: [
        VaccinationprofileController
    ],
    providers: [
        VaccinationprofileServices,
        VaccinationprofileRepository
    ],
    exports: [
        VaccinationprofileServices
    ]
})
export class VaccinationProfileModule {}