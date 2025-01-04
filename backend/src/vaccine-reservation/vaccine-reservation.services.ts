import { Injectable } from '@nestjs/common';
import { VaccinereservationRepository } from './vaccine-reservation.repository';
import { VaccineReservation } from './vaccine-reservation.entity';
import { VaccineReservationCreateDto } from './dto/vaccine-reservation-create.dto';

@Injectable()
export class VaccineReservationServices {
    constructor(
        private vaccineReservationRepository: VaccinereservationRepository
    ) {}

    async create(
        userId: string,
        createDto: VaccineReservationCreateDto
    ): Promise<VaccineReservation> {
        return await this.vaccineReservationRepository.create(
            userId,
            createDto
        );
    }

    async update(id: string): Promise<VaccineReservation> {
        return await this.vaccineReservationRepository.update(id);
    }

    async getAllByUserId(id: string): Promise<VaccineReservation[]> {
        return this.vaccineReservationRepository.findAllOfUser(id);
    }

    async getByOrderId(id: string): Promise<VaccineReservation> {
        return this.vaccineReservationRepository.findByOrderId(id);
    }

    async getAllByEmail(email: string): Promise<VaccineReservation[] | null> {
        return await this.vaccineReservationRepository.findAllReservationByEmail(
            email
        );
    }

    async getAll(): Promise<VaccineReservation[] | null> {
        return await this.vaccineReservationRepository.findAllReservation();
    }

    async deleteById(id: number): Promise<any> {
        return await this.vaccineReservationRepository.deleteReservationTimeOutById(
            id
        );
    }
}
