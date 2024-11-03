import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserServices } from "./user.services";
import { UserRepository } from "./user.repository";
import { VaccinationProfileModule } from "src/vaccination-profile/vaccination-profile.module";
import { UserAdminServices } from "./admin/user-admin.services";
import { VaccineReservationModule } from "src/vaccine-reservation/vaccine-reservation.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        forwardRef(() => VaccinationProfileModule),
        forwardRef(() => VaccineReservationModule),
    ],
    controllers: [UserController],
    providers: [
        UserServices, 
        UserRepository,
        UserAdminServices
    ],
    exports: [UserServices]
})
export class UserModule {}