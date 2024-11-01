import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Vaccine } from 'src/vaccine/vaccine.entity';
import { VaccinationAppointment } from 'src/vaccination-appointment/vaccination-appointment.entity';
import { VaccinationCenter } from 'src/vaccination-center/vaccination-center.entity';
import { VaccinationProfile } from 'src/vaccination-profile/vaccination-profile.entity';

@Entity()
export class VaccineReservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.vaccineReservation)
  user: User;

  @ManyToOne(
    () => VaccinationProfile,
    (profile) => profile.vaccineReservation,
  )
  profile: VaccinationProfile;

  @ManyToMany(() => Vaccine, (vaccine) => vaccine.vaccineReservation)
  @JoinTable()
  vaccine: Vaccine;

  @ManyToOne(
    () => VaccinationCenter,
    (vaccinationCenter) => vaccinationCenter.vaccineReservation,
  )
  vaccinationCenter: VaccinationCenter;

  @CreateDateColumn()
  reservationDate: Date;

  @Column()
  appointmentDate: Date;

  @Column({ default: 'Pending' })
  status: string;

  @Column()
  paymentMethod: string;

  @Column({ type: 'bigint' })
  price: number;

  @OneToOne(() => VaccinationAppointment, appointment => appointment.reservation)
  appointment: VaccinationAppointment;

  isReservationValid(): boolean {
    const currentDate = new Date();
    const expirationDate = new Date(this.appointmentDate);
    expirationDate.setDate(expirationDate.getDate() + 5);

    return currentDate <= expirationDate;
  }
}
