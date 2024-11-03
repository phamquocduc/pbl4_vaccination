import { Injectable } from "@nestjs/common";
import { VaccinereservationRepository } from "./vaccine-reservation.repository";
import { VaccineReservation } from "./vaccine-reservation.entity";
import { VaccineReservationCreateDto } from "./dto/vaccine-reservation-create.dto";

@Injectable()
export class VaccineReservationServices{
    constructor(
        private vaccineReservationRepository: VaccinereservationRepository
    ){}

    async create(userId: string, createDto: VaccineReservationCreateDto): Promise<VaccineReservation>{
        return await this.vaccineReservationRepository.create(userId, createDto)
    }
}
