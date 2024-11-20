import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VaccineReservation } from "./vaccine-reservation.entity";
import { VaccineReservationCreateDto } from "./dto/vaccine-reservation-create.dto";
import { VaccineRepository } from "src/vaccine/vaccine.repository";
import { log } from "console";
import * as moment from "moment";
import { createVNPayMethodParam } from "src/enums/vaccine-reservation-payment-method.enum";

@Injectable()
export class VaccinereservationRepository{
    constructor(
        @InjectRepository(VaccineReservation)
        private vaccinereservationRepository: Repository<VaccineReservation>,
        private vaccineRepository: VaccineRepository
    ){}

    async create(userId: string, createDto: VaccineReservationCreateDto): Promise<VaccineReservation>{

        const price = await this.vaccineRepository.getTotalPrice(createDto.vaccineIds)

        const paymentMethod = createVNPayMethodParam(createDto.paymentMethod)

        const date = new Date()

        const orderId = moment(date).format('YYYMMDDHHmmss');

        const newVaccineReservation = this.vaccinereservationRepository.create({
            ...createDto,
            orderId: orderId,
            price: price,
            paymentMethod: paymentMethod,
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