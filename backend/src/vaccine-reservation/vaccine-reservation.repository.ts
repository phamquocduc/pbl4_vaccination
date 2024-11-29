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

        const price = (await this.vaccineRepository.findOneById(createDto.vaccineId)).price

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
            vaccine: {id: createDto.vaccineId} 
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

    async findAllOfUser(id: string): Promise<VaccineReservation[] | null>{
        const vaccineReservation = await this.vaccinereservationRepository.find({
            where: {
                user: {id: id}
            },
            relations: {
                appointments: true,
                vaccinationCenter: true,
                vaccine: true,
                profile: true
            }
        })

        return vaccineReservation
    }

    async findByOrderId(orderId: string): Promise<VaccineReservation | null>{
        const vaccineReservation = await this.vaccinereservationRepository.findOne({
            where: {
                orderId: orderId
            },
            relations: {
                appointments: true,
                vaccine: true
            }
        })

        return vaccineReservation
    }

    async findAllReservationByEmail(email: string): Promise<VaccineReservation[] | null>{
        return await this.vaccinereservationRepository.find({
            where: {
                user:{ email: email}
            },
            relations:{
                appointments: true,
                vaccine: true,
                vaccinationCenter: true,
                profile: true
            }
        })
    }   
}