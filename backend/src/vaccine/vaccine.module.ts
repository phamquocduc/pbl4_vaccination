import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vaccine } from "./vaccine.entity";
import { VaccineController } from "./vaccine.controller";
import { VaccineServices } from "./vaccine.services";
import { VaccineRepository } from "./vaccine.repository";
import { VaccineDescriptionModule } from "src/vaccine-descrpition/vaccine-descrpition.module";
import { VaccineInventoryModule } from "src/vaccine-inventory/vaccine-inventory.module";
import { VaccineReservationModule } from "src/vaccine-reservation/vaccine-reservation.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { VaccinationAppointmentModule } from "src/vaccination-appointment/vaccination-appointment.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([Vaccine]),
        forwardRef(() => VaccineDescriptionModule),
        forwardRef(() => VaccineInventoryModule),
        forwardRef(() => VaccineReservationModule),
        forwardRef(() => VaccinationAppointmentModule),
        CloudinaryModule
    ],
    controllers: [
        VaccineController
    ],
    providers: [
        VaccineServices,
        VaccineRepository
    ],
    exports: [
        VaccineServices,
        VaccineRepository
    ]
})
export class VaccineModule {}