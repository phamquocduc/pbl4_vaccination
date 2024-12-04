import { VaccinationAppointment } from 'src/vaccination-appointment/vaccination-appointment.entity';
import { VaccineInventory } from 'src/vaccine-inventory/vaccine-inventory.entity';
import { VaccineReservation } from 'src/vaccine-reservation/vaccine-reservation.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

@Entity()
export class VaccinationCenter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    capacity: number;

    @Column({ default: false })
    isDeleted: boolean;

    @OneToOne(
        () => VaccineInventory,
        (vaccineinventory) => vaccineinventory.vaccinationCenter
    )
    vaccineinventory: VaccineInventory;

    @OneToMany(
        () => VaccineReservation,
        (vaccineReservation) => vaccineReservation.vaccinationCenter
    )
    vaccineReservation: VaccineReservation[];

    @OneToMany(
        () => VaccinationAppointment,
        (vaccineAppointments) => vaccineAppointments.vaccinationCenter
    )
    vaccineAppointments: VaccinationAppointment[];
}
