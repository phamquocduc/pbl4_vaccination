import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VaccineReservation } from "./vaccine-reservation.entity";
import { VaccineReservationCreateDto } from "./dto/vaccine-reservation-create.dto";
import { VaccineRepository } from "src/vaccine/vaccine.repository";
import { log } from "console";
import * as moment from "moment";
import { createVNPayMethodParam } from "src/enums/vaccine-reservation-payment-method.enum";
import { VaccineReservationUpdateDto } from "./dto/vaccine-reservation-update.dto";
import { CustomAppException } from "src/exceptions/custom-app.exceptions";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";
import { EVaccineReservationStatus } from "src/enums/vaccine-reservation.enum";

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

    async update(id: string): Promise<VaccineReservation>{

        let vaccineReservation = await this.vaccinereservationRepository.findOne({
            where: {orderId: id}
        })

        if(!vaccineReservation)
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.VACCINE_RESERVATION_NOT_EXIT), HttpStatus.BAD_REQUEST)

        const updateDto : VaccineReservationUpdateDto = {
            status: EVaccineReservationStatus.CONFIRMED,
            isPaid: true
        }

        Object.assign(vaccineReservation, updateDto)

        return await this.vaccinereservationRepository.save(vaccineReservation)
    }
}