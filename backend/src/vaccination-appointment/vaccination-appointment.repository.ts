import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VaccinationAppointment } from './vaccination-appointment.entity';
import { VaccineReservation } from 'src/vaccine-reservation/vaccine-reservation.entity';
import { VaccineAppointmentUpdateDto } from './dto/vaccine-appointment-update.dto';
import { CustomAppException } from 'src/exceptions/custom-app.exceptions';
import {
    createExceptionMessage,
    ExceptionEnum,
} from 'src/enums/exception.enum';

@Injectable()
export class VaccinationAppointmentRepository {
    constructor(
        @InjectRepository(VaccinationAppointment)
        private VaccinationAppointmentRepository: Repository<VaccinationAppointment>
    ) {}

    async create(
        durationIntervals: number[],
        numberOfAppointment: number[],
        vaccineReservation: VaccineReservation
    ) {
        let firstAppointmentDate = new Date(vaccineReservation.appointmentDate);

        console.log(numberOfAppointment.length);
        for (let k = 0; k < numberOfAppointment.length; k++) {
            for (let i = 0; i < numberOfAppointment[k]; i++) {
                if (i !== 0) {
                    firstAppointmentDate = new Date(
                        firstAppointmentDate.setDate(
                            firstAppointmentDate.getDate() +
                                durationIntervals[k]
                        )
                    );
                }

                let nextAppointmentDate = new Date(firstAppointmentDate);
                if (i < numberOfAppointment[k] - 1) {
                    nextAppointmentDate = new Date(
                        nextAppointmentDate.setDate(
                            nextAppointmentDate.getDate() + durationIntervals[k]
                        )
                    );
                } else {
                    nextAppointmentDate = null;
                }

                const appointment =
                    this.VaccinationAppointmentRepository.create({
                        nextAppointmentDate: nextAppointmentDate,
                        appointmentDate: firstAppointmentDate,
                        vaccinationCenter: {
                            id: vaccineReservation.vaccinationCenter.id,
                        },
                        vaccine: { id: vaccineReservation.vaccines[k].id },
                        reservation: { id: vaccineReservation.id },
                    });

                await this.VaccinationAppointmentRepository.save(appointment);
            }
            firstAppointmentDate = new Date(vaccineReservation.appointmentDate);
        }
    }

    async updateById(
        id: number,
        appointmentUpdateDto: VaccineAppointmentUpdateDto
    ): Promise<VaccinationAppointment> {
        let appointment = await this.VaccinationAppointmentRepository.findOne({
            where: { id: id },
        });

        if (!appointment)
            throw new CustomAppException(
                createExceptionMessage(
                    ExceptionEnum.VACCINE_APPOINTMENT_NOT_EXIT
                ),
                HttpStatus.BAD_REQUEST
            );

        Object.assign(appointment, appointmentUpdateDto);

        return await this.VaccinationAppointmentRepository.save(appointment);
    }

    async findByEmail(email: string): Promise<VaccinationAppointment[] | null> {
        const appointments = await this.VaccinationAppointmentRepository.find({
            where: {
                reservation: {
                    profile: {
                        email: email,
                    },
                },
            },
            relations: {
                vaccinationCenter: true,
                vaccine: true,
                reservation: true,
            },
            select: {
                vaccinationCenter: {
                    id: true,
                    name: true,
                    address: true,
                },
                vaccine: {
                    id: true,
                    name: true,
                    durationIntervals: true,
                },
                reservation: {
                    id: true,
                },
            },
        });

        return appointments;
    }
}
