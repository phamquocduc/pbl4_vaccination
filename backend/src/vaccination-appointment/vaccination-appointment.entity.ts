import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    Column,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { VaccineReservation } from 'src/vaccine-reservation/vaccine-reservation.entity';
import { Vaccine } from 'src/vaccine/vaccine.entity';

@Entity()
export class VaccinationAppointment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => VaccineReservation,
        (reservation) => reservation.appointments
    )
    reservation: VaccineReservation;

    @Column()
    appointmentDate: Date;

    @ManyToOne(() => Vaccine, (vaccine) => vaccine.appointments)
    vaccine: Vaccine;

    @Column({ nullable: true })
    nextAppointmentDate: Date;

    @Column({ default: false })
    isCompleted: boolean;
}
