import { Entity, PrimaryGeneratedColumn, OneToOne, Column, JoinColumn } from "typeorm";
import { VaccineReservation } from "src/vaccine-reservation/vaccine-reservation.entity";

@Entity()
export class VaccinationAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => VaccineReservation, reservation => reservation.appointment)
  @JoinColumn() 
  reservation: VaccineReservation;

  @Column({ default: false })
  isCompleted: boolean;
}