import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VaccineReservation } from "./vaccine-reservation.entity";
import { VaccineReservationCreateDto } from "./dto/vaccine-reservation-create.dto";
import { VaccineRepository } from "src/vaccine/vaccine.repository";
import { log } from "console";

@Injectable()
export class VaccinereservationRepository{
    constructor(
        @InjectRepository(VaccineReservation)
        private vaccinereservationRepository: Repository<VaccineReservation>,
        private vaccineRepository: VaccineRepository
    ){}

    async create(userId: string, createDto: VaccineReservationCreateDto): Promise<VaccineReservation>{

        const price = await this.vaccineRepository.getTotalPrice(createDto.vaccineIds)

        const newVaccineReservation = this.vaccinereservationRepository.create({
            ...createDto,
            price: price,
            user: {id: userId},
            profile: {id: createDto.profileId},
            vaccinationCenter: {id: createDto.vaccinationCenterId},
            vaccines: createDto.vaccineIds.map((id) => {
                return {
                    id: id
                }
            })
        })

        return await this.vaccinereservationRepository.save(newVaccineReservation)
    }
}