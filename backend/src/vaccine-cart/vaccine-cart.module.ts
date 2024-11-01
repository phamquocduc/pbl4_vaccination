import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccineCart } from "./vaccine-cart.entity";
import { VaccinecartController } from "./vaccine-cart.controller";
import { VaccinecartServices } from "./vaccine-cart.services";
import { VaccinecartRepository } from "./vaccine-cart.repository";

@Module({
    imports:[TypeOrmModule.forFeature([VaccineCart])],
    controllers: [
        VaccinecartController
    ],
    providers: [
        VaccinecartServices,
        VaccinecartRepository
    ],
    exports: [
        VaccinecartServices
    ]
})
export class VaccineCartModule {}