import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VaccineReservation } from './vaccine-reservation.entity';
import { VaccineReservationCreateDto } from './dto/vaccine-reservation-create.dto';
import { VaccineRepository } from 'src/vaccine/vaccine.repository';
import { log } from 'console';
import * as moment from 'moment';
import { createVNPayMethodParam } from 'src/enums/vaccine-reservation-payment-method.enum';
import { VaccineReservationUpdateDto } from './dto/vaccine-reservation-update.dto';
import { CustomAppException } from 'src/exceptions/custom-app.exceptions';
import {
    createExceptionMessage,
    ExceptionEnum,
} from 'src/enums/exception.enum';
import { EVaccineReservationStatus } from 'src/enums/vaccine-reservation.enum';

@Injectable()
export class VaccinereservationRepository {
    constructor(
        @InjectRepository(VaccineReservation)
        private vaccinereservationRepository: Repository<VaccineReservation>,
        private vaccineRepository: VaccineRepository
    ) {}

    async create(
        userId: string,
        createDto: VaccineReservationCreateDto
    ): Promise<VaccineReservation> {
        const date = new Date();

        const orderId = moment(date).format('YYYMMDDHHmmss');

        const newVaccineReservation = this.vaccinereservationRepository.create({
            ...createDto,
            orderId: orderId,
            user: { id: userId },
            profile: { id: createDto.profileId },
            vaccinationCenter: { id: createDto.vaccinationCenterId },
            vaccines: createDto.vaccineIds.map((id) => {
                return {
                    id: id,
                };
            }),
        });

        return await this.vaccinereservationRepository.save(
            newVaccineReservation
        );
    }

    async update(id: string): Promise<VaccineReservation> {
        let vaccineReservation =
            await this.vaccinereservationRepository.findOne({
                where: { orderId: id },
            });

        if (!vaccineReservation)
            throw new CustomAppException(
                createExceptionMessage(
                    ExceptionEnum.VACCINE_RESERVATION_NOT_EXIT
                ),
                HttpStatus.BAD_REQUEST
            );

        const updateDto: VaccineReservationUpdateDto = {
            status: EVaccineReservationStatus.CONFIRMED,
            isPaid: true,
        };

        Object.assign(vaccineReservation, updateDto);

        return await this.vaccinereservationRepository.save(vaccineReservation);
    }

    async findAllOfUser(id: string): Promise<VaccineReservation[] | null> {
        const vaccineReservation = await this.vaccinereservationRepository.find(
            {
                where: {
                    user: { id: id },
                },
                relations: {
                    appointments: {
                        vaccine: true,
                        vaccinationCenter: true,
                    },
                    vaccinationCenter: true,
                    vaccines: true,
                    profile: true,
                },
                select: {
                    appointments: {
                        id: true,
                        appointmentDate: true,
                        nextAppointmentDate: true,
                        isCompleted: true,
                        vaccine: {
                            id: true,
                            name: true,
                        },
                        vaccinationCenter: {
                            id: true,
                            name: true,
                        },
                    },
                    vaccines: {
                        id: true,
                        name: true,
                    },
                },
            }
        );

        return vaccineReservation;
    }

    async findByOrderId(orderId: string): Promise<VaccineReservation | null> {
        const vaccineReservation =
            await this.vaccinereservationRepository.findOne({
                where: {
                    orderId: orderId,
                },
                relations: {
                    vaccinationCenter: true,
                    appointments: true,
                    vaccines: true,
                },
            });

        return vaccineReservation;
    }

    async findAllReservationByEmail(
        email: string
    ): Promise<VaccineReservation[] | null> {
        return await this.vaccinereservationRepository.find({
            where: {
                profile: { email: email },
            },
            relations: {
                appointments: {
                    vaccine: true,
                    vaccinationCenter: true,
                },
                vaccinationCenter: true,
                vaccines: true,
                profile: true,
            },
            select: {
                appointments: {
                    id: true,
                    appointmentDate: true,
                    nextAppointmentDate: true,
                    isCompleted: true,
                    vaccine: {
                        id: true,
                        name: true,
                    },
                    vaccinationCenter: {
                        id: true,
                        name: true,
                    },
                },
                vaccines: {
                    id: true,
                    name: true,
                },
            },
        });
    }

    async findAllReservation(): Promise<VaccineReservation[] | null> {
        return await this.vaccinereservationRepository.find({
            relations: {
                appointments: {
                    vaccine: true,
                    vaccinationCenter: true,
                },
                vaccinationCenter: true,
                vaccines: true,
                profile: true,
            },
            select: {
                appointments: {
                    id: true,
                    appointmentDate: true,
                    nextAppointmentDate: true,
                    isCompleted: true,
                    vaccine: {
                        id: true,
                        name: true,
                        durationIntervals: true,
                    },
                    vaccinationCenter: {
                        id: true,
                        name: true,
                    },
                },
                vaccines: {
                    id: true,
                    name: true,
                },
            },
        });
    }

    async deleteReservationTimeOutById(id: number): Promise<any> {
        const reservation = await this.vaccinereservationRepository.findOne({
            where: { id: id },
        });

        if (!reservation) {
            throw new CustomAppException(
                createExceptionMessage(
                    ExceptionEnum.VACCINE_RESERVATION_NOT_EXIT
                ),
                HttpStatus.BAD_REQUEST
            );
        } else if (reservation.isPaid === false) {
            await this.vaccinereservationRepository.delete(reservation.id);
        }

        return {
            code: 102,
            message: 'delete success',
        };
    }
}
